import { connect } from 'react-redux';
import FlashMessagesList from '../components/FlashMessages/FlashMessagesList';
import { removeMessage } from '../modules/flashMessages/actions';

const mapStateToProps = (state) => {
    return {
        messages: state.flashMessages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseMessage: (id) => {
            dispatch(removeMessage(id));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlashMessagesList);
