import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import VideoMainInfoEditForm from '../components/VideoMainInfoEditForm';
import { getEditingSliceId, getEditingVideoId, getSliceData } from '../modules/info/reducers/info';
import { submitSliceData } from '../modules/info/actions';
import { addSuccessMessage } from '../modules/flashMessages/actions';

const selector = formValueSelector('sliceMainInfoEditForm'); 

const mapStateToProps = (state) => {
    const description = selector(state, 'description');
    return {
        initialValues: getSliceData(state.info, getEditingSliceId(state.info), getEditingVideoId(state.info)),
        description
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

const form = reduxForm({
    form: 'sliceMainInfoEditForm',
    enableReinitialize: true
})(VideoMainInfoEditForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(form);