import { connect } from 'react-redux';
import { remove, resize } from '../modules/slices/actions';
import Timeline from '../components/Timeline';

const mapStateToProps = (state) => {
    return {
        currentTime: state.video.currentTime,
        currentPercentage: state.video.currentPercentage,
        duration: state.video.duration,
        slices: state.slices,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onResizeSlice: (sliceId, offsetDelta, durationDelta, factor) => {
            dispatch(resize(sliceId, offsetDelta, durationDelta, factor))
        },
        onRemoveSlice: (id) => {
            dispatch(remove(id))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline);
