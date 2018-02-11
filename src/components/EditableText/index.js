import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const { string, func } = PropTypes;

export default class EditableText extends Component {
    static propTypes = {
        text: string.isRequired,
        onChange: func.isRequired,
        validate: func
    };

    state = {
        editing: false,
        text: this.props.text
    };

    startEditing = () => {
        this.setState({editing: true, text: this.props.text});
    };

    finishEditing = () => {
        if (this.isInputValid(this.state.text) && this.props.text != this.state.text){
            this.applyEditing();
        } else {
            this.cancelEditing();
        }
    };

    applyEditing = () => {
        this.setState({editing: false, text: this.state.text});
        this.props.onChange(this.state.text);
    };

    cancelEditing = () => {
        this.setState({ editing: false, text: this.props.text });
    };

    keyDown = (event) => {
        if (event.keyCode === 13) {
            this.finishEditing();
        } else if (event.keyCode === 27) {
            this.cancelEditing();
        }
    };

    textChanged = (event) => {
        this.setState({
            text: event.target.value.trim()
        });
    };

    isInputValid = (text) => {
        return this.props.validate ? this.props.validate(text) : true;
    };

    render() {
        if (!this.state.editing) {
            return <span onClick={this.startEditing}>{this.props.text}</span>;
        } else {
            return <input styleName="input" value={this.state.text} onKeyDown={this.keyDown} onBlur={this.finishEditing} onChange={this.textChanged} />;
        }
    }
}