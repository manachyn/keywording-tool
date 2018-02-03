import React, { Component } from 'react';
import PropTypes from 'prop-types';

const messageClasses = {
    error: 'alert-danger',
    warning: 'alert-warning',
    notice: 'alert-info',
    success: 'alert-success'
};

const messageClass = type => {
    return messageClasses[type] || messageClasses.success;
};

export default class FlashMessage extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired
    };

    handleClose = () => {
        this.props.onClose(this.props.id);
    };

    render() {
        const { type, message } = this.props.message;
        const messageClassName = `alert ${ messageClass(type) } fade in`;

        return(
            <div className={ messageClassName }>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={ this.handleClose }>
                    <span aria-hidden="true">&times;</span>
                </button>
                { message }
            </div>
        );
    }
}
