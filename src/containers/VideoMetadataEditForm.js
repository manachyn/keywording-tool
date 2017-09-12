import { connect } from 'react-redux';

import VideoMetadataEditForm from '../components/VideoMetadataEditForm';
import { getEditingVideoId, getVideoData } from '../modules/info/reducers/info';
import { submitVideoData } from '../modules/info/actions';
import { addSuccessMessage } from '../modules/flashMessages/actions';

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
            return submitVideoData(videoId, values, dispatch);
        },
        onSubmitSuccess: (result, dispatch, props) => {
            dispatch(addSuccessMessage('Metadata has been saved'));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoMetadataEditForm);