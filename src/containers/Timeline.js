import { connect } from 'react-redux';
import { addAndStartSlicing, remove, resize } from '../modules/slicing/actions';
import { getAllSlices } from '../modules/slicing/reducers/slices';
import Timeline from '../components/Timeline';

const mapStateToProps = (state) => {
    return {
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
        duration: state.video.duration,
        slices: getAllSlices(state.slices),
        slicingSlices: state.slices.slicingIds
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onResizeSlice: (sliceId, offsetDelta, durationDelta, factor) => {
            dispatch(resize(sliceId, offsetDelta, durationDelta, factor))
        },
        onRemoveSlice: (id) => {
            dispatch(remove(id))
        },
        onSetInPoint: (currentTime) => {
            dispatch(addAndStartSlicing(currentTime))
        },
        onSetOutPoint: () => {
            console.log('Out');
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
