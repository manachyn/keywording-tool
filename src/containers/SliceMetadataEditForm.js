import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import VideoMetadataEditForm from '../components/VideoMetadataEditForm';
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
            dispatch(addSuccessMessage('Metadata has been saved'));
        }
    }
};

const form = reduxForm({
    form: 'sliceMetadataEditForm',
    enableReinitialize: true
})(VideoMetadataEditForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(form);