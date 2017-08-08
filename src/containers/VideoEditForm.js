import { connect } from 'react-redux';

import VideoEditForm from '../components/VideoEditForm';
import { getEditingVideoId, getVideoData } from '../modules/info/reducers/info';
import { saveVideoData } from '../modules/info/actions';

const mapStateToProps = (state) => {
    const videoId = getEditingVideoId(state.info);

    return {
        videoId,
        initialValues: getVideoData(state.info, videoId)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (videoId, values) => {
            //dispatch(saveVideoData(videoId, values))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoEditForm);