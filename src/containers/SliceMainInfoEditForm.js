import { connect } from 'react-redux';

import VideoMainInfoEditForm from '../components/VideoMainInfoEditForm';
import { getEditingSliceId, getSliceData } from '../modules/info/reducers/info';
import { submitSliceData } from '../modules/info/actions';
import { addSuccessMessage } from '../modules/flashMessages/actions';

const mapStateToProps = (state) => {
    return {
        initialValues: getSliceData(state.info, getEditingSliceId(state.info))
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (sliceId, values) => {
            return submitSliceData(sliceId, values, dispatch);
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