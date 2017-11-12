import { connect } from 'react-redux';
import { setInPoint, setOutPoint, remove, resize } from '../../modules/slicing/actions';
import { getAllSlices } from '../../modules/slicing/reducers/slices';
import { validateSliceStartOffset, validateSliceFinishOffset } from '../../modules/slicing/validation/validators';
import Timeline from '../../components/Timeline';

const videoId = 1;

const mapStateToProps = (state) => {
    return {
        video: {
            id: videoId,
            url: state.video.url
        },
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
        duration: state.video.duration,
        slices: getAllSlices(state.slices, videoId),
        slicingSliceId: state.slices.slicingId,
        canSetInPoint: state.slices.slicingId == null && validateSliceStartOffset(state.video.currentTime, state.slices),
        canSetOutPoint: state.slices.slicingId != null && validateSliceFinishOffset(state.video.currentTime, state.slices.slicingId, state.slices)
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
        onSetInPoint: (currentTime) => {
            dispatch(setInPoint(currentTime, videoId))
        },
        onSetOutPoint: (currentTime) => {
            dispatch(setOutPoint(currentTime))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
