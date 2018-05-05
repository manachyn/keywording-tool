import { connect } from 'react-redux';
import { getSelectedVideo, getSelectedVideoId } from '../modules/uploads/reducers/videos';
import { getAllSlices } from '../modules/slicing/reducers/slices';
import { editSliceData } from '../modules/info/actions';
import Timeline from './Timeline';

const mapStateToProps = (state) => {
    return {
        video: getSelectedVideo(state.videos),
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
        duration: state.video.duration,
        slices: getAllSlices(state.slices, getSelectedVideoId(state.videos)),
        slicingSliceId: state.slices.slicingId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onEditSlice: (id) => {
            dispatch(editSliceData(id))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
