import { connect } from 'react-redux';
import { hasSelectedVideo } from '../modules/uploads/reducers/videos';
import Navigation from '../components/Navigation';

const mapStateToProps = (state) => {
    return {
        isSlicingEnabled: hasSelectedVideo(state.videos)
    }
};

export default connect(
    mapStateToProps
)(Navigation);