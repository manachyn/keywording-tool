import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import VideoMetadataEditForm from '../components/VideoMetadataEditForm';
import { getEditingVideoId, getVideoData } from '../modules/info/reducers/info';
import { submitVideoData } from '../modules/info/actions';
import { addSuccessMessage } from '../modules/flashMessages/actions';

const mapStateToProps = (state) => {
    const videoId = getEditingVideoId(state.info);

    return {
        elementId: videoId,
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

const form = reduxForm({
    form: 'videoMetadataEditForm',
    enableReinitialize: true
})(VideoMetadataEditForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(form);