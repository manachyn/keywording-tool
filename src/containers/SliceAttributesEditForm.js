import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import VideoAttributesEditForm from '../components/VideoAttributesEditForm';
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
            dispatch(addSuccessMessage('Attributes have been saved'));
        }
    }
};

const form = reduxForm({
    form: 'sliceAttributesEditForm',
    enableReinitialize: true
})(VideoAttributesEditForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(form);