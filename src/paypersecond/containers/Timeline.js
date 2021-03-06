import { connect } from 'react-redux';
import { getSelectedVideo, getSelectedVideoId } from '../../modules/uploads/reducers/videos';
import { isPlaying } from '../../modules/slicing/reducers/slices';
import { getSlicesOfSelectedVideo } from '../../selectors';
import { setInPoint, setOutPoint, remove, resize, play, stop, pause } from '../../modules/slicing/actions';
import { seek } from '../../modules/video/actions';
import { getAllSlices } from '../../modules/slicing/reducers/slices';
import { validateSliceStartOffset, validateSliceFinishOffset } from '../../modules/slicing/validation/validators';
import Timeline from '../../components/Timeline';

// import '../../../node_modules/font-awesome/css/font-awesome.css'`
import 'bootstrap/dist/css/bootstrap.css';

const videoId = 1;

const mapStateToProps = (state) => {
    const selectedVideoId = getSelectedVideoId(state.videos);

    return {
        video: getSelectedVideo(state.videos),
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
        duration: state.video.duration,
        startTimecode: state.video.startTimecode,
        //slices: getAllSlices(state.slices, selectedVideoId),
        slices: getSlicesOfSelectedVideo(state),
        slicingSliceId: state.slices.slicingId,
        playingSliceId: state.slices.playingId,
        playing: isPlaying(state),
        canSetInPoint: state.slices.slicingId === null && validateSliceStartOffset(selectedVideoId, state.video.currentTime, state.slices),
        canSetOutPoint: state.slices.slicingId !== null && validateSliceFinishOffset(state.video.currentTime, state.slices.slicingId, state.slices)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onResizeSlice: (sliceId, offsetDelta, durationDelta, factor) => {
            dispatch(resize(sliceId, offsetDelta, durationDelta, factor))
        },
        onRemoveSlice: (id) => {
            dispatch(remove(id))
        },
        onPlaySlice: (id) => {
            dispatch(play(id))
        },
        onStopSlice: (id) => {
            dispatch(stop(id))
        },
        onPauseSlice: (id) => {
            dispatch(pause(id))
        },
        onSetInPoint: (currentTime) => {
            dispatch(setInPoint(currentTime))
        },
        onSetOutPoint: (currentTime) => {
            dispatch(setOutPoint(currentTime))
        },
        onSetCurrentTime: (currentTime, duration) => {
            dispatch(seek(currentTime))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
