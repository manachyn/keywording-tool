import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import VideoMainInfoEditForm from '../components/VideoMainInfoEditForm';
import { getEditingVideoId, getVideoData } from '../modules/info/reducers/info';
import { submitVideoData } from '../modules/info/actions';
import { addSuccessMessage } from '../modules/flashMessages/actions';

const selector = formValueSelector('videoMainInfoEditForm'); 

const mapStateToProps = (state) => {
    const videoId = getEditingVideoId(state.info);
    const description = selector(state, 'description');
    return {
        elementId: videoId,
        initialValues: getVideoData(state.info, videoId),
        description
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // // Sync
        // onSubmit: (videoId, values) => {
        //     dispatch(saveVideoData(videoId, values));
        // },
        // Async
        onSubmit: (videoId, values) => {
            return submitVideoData(videoId, values, dispatch);
        },
        onSubmitSuccess: (result, dispatch, props) => {
            dispatch(addSuccessMessage('Main information has been saved'));
        }
    }
};

const form = reduxForm({
    form: 'videoMainInfoEditForm',
    enableReinitialize: true
})(VideoMainInfoEditForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(form);