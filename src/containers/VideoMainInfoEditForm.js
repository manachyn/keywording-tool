import { connect } from 'react-redux';

import VideoMainInfoEditForm from '../components/VideoMainInfoEditForm';
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoMainInfoEditForm);