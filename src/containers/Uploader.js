import { connect } from 'react-redux';
import { add, uploaded, update, remove, select } from '../modules/uploads/actions';
import { getAllVideos, getSelectedVideoId } from '../modules/uploads/reducers/videos';
import UploaderComponent from '../components/Uploader';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import { API_ROOT } from '../api';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true,
            concurrent: {
                enabled: true
            },
            success: {
                endpoint: API_ROOT + 'upload/combine'
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: API_ROOT + 'upload/delete',
            // method: 'POST'
        },
        request: {
            endpoint: API_ROOT + 'upload/upload',
        },
        // resume: {
        //     enabled: true
        // },
        retry: {
            enableAuto: true,
            // showButton: true
        }
    }
});

const mapStateToProps = (state) => {
    return {
        uploader,
        files: getAllVideos(state.videos),
        selectedFileId: getSelectedVideoId(state.videos)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onFileUploaded: (id, url) => {
        //     dispatch(addAndSelect(url, id));
        // },
        // onFileDeleted: (id) => {
        //     dispatch(remove(id));
        // },
        onFileAdd: (id) => {
            dispatch(add(id));
        },
        onFileUploaded: (id) => {
            dispatch(uploaded(id));
        },
        onFileRemove: (id) => {
            dispatch(remove(id));
        },
        onFileUpdate: (id, data) => {
            dispatch(update(id, data));
        },
        onFileSelect: (id) => {
            dispatch(select(id));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploaderComponent);

