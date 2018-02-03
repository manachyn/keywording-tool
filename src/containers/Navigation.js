import { connect } from 'react-redux';
import { hasSelectedVideo, getSelectedVideoId } from '../modules/uploads/reducers/videos';
import { hasSlices } from '../modules/slicing/reducers/slices';
import Navigation from '../components/Navigation';

const mapStateToProps = (state) => {
    return {
        isInfoEnabled: hasSelectedVideo(state.videos),
        isSlicingEnabled: hasSelectedVideo(state.videos),
        isEditingEnabled: hasSelectedVideo(state.videos),
        isProcessingEnabled: hasSelectedVideo(state.videos)
    }
};

export default connect(
    mapStateToProps
)(Navigation);