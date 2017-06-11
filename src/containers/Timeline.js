import { connect } from 'react-redux';
import { getSelectedVideo } from '../modules/uploads/reducers/videos';
import { setInPoint, setOutPoint, remove, resize } from '../modules/slicing/actions';
import { getAllSlices } from '../modules/slicing/reducers/slices';
import Timeline from '../components/Timeline';

const mapStateToProps = (state) => {
    return {
        video: getSelectedVideo(state.videos),
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
        duration: state.video.duration,
        slices: getAllSlices(state.slices),
        slicingSliceId: state.slices.slicingId
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
            console.log('onSetInPoint');
            dispatch(setInPoint(currentTime))
        },
        onSetOutPoint: (currentTime) => {
            console.log('onSetOutPoint');
            dispatch(setOutPoint(currentTime))
        },
    }
};

// const mergeProps = (stateProps, dispatchProps, ownProps) => ({
//     ...stateProps,
//     ...dispatchProps,
//     onSetInPoint: (currentTime) => {
//         dispatchProps.addAndStartSlicing(currentTime);
//     },
//     onSetOutPoint: () => {
//         console.log('OutPoint');
//         //finishSlicing();
//     },
// });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
