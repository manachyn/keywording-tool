import { connect } from 'react-redux';

import Processing from '../components/Processing';
import { getProcessedSlices } from '../modules/processing/reducers';
import { getSelectedVideoId } from '../modules/uploads/reducers/videos';
import { createClips, checkStatus } from '../modules/processing/actions';

const mapStateToProps = (state) => {
    return {
        isProcessing: state.processing.isProcessing,
        slices: getProcessedSlices(state, getSelectedVideoId(state.videos)),
        jobId: state.processing.jobId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createClips: () => {
            dispatch(createClips());
        },
        checkStatus: (jobId) => {
            dispatch(checkStatus(jobId));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Processing);