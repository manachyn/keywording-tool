import { connect } from 'react-redux';
import { hasSelectedVideo } from '../modules/uploads/reducers/videos';
import Navigation from '../components/Navigation';

const mapStateToProps = (state) => {
    return {
        isInfoEnabled: hasSelectedVideo(state.videos),
        isSlicingEnabled: hasSelectedVideo(state.videos),
        isProcessingEnabled: hasSelectedVideo(state.videos)
    }
};

export default connect(
    mapStateToProps
)(Navigation);