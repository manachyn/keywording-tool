import { connect } from 'react-redux';
import { add, uploaded, update, remove, select } from '../modules/uploads/actions';
import { getAllVideos, getSelectedVideoId } from '../modules/uploads/reducers/videos';
import UploaderComponent from '../components/Uploader';
import FineUploaderTraditional from 'fine-uploader-wrappers';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true,
            concurrent: {
                enabled: true
            },
            success: {
                endpoint: "http://workflow.mysitedemo.co.uk/endpoint-cors.php?done"
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: 'http://workflow.mysitedemo.co.uk/endpoint-cors.php',
            method: 'POST'
        },
        request: {
            endpoint: 'http://workflow.mysitedemo.co.uk/endpoint-cors.php'
        },
        retry: {
            enableAuto: true
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

