import { connect } from 'react-redux';
import { loadedMetadata, timeUpdate } from '../modules/video/actions';
import Video from '../components/Video';

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadedMetadata: (metadata) => {
            dispatch(loadedMetadata(metadata))
        },
        onTimeUpdate: (currentTime, duration) => {
            dispatch(timeUpdate(currentTime, duration))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Video);
