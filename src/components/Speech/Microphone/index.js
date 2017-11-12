import React, { Component } from 'react';
import { VoiceRecognition } from 'react-voice-components';
import StartButton from './StartButton';
import StopButton from './StopButton';

import './styles.css';

class Microphone extends Component {
    state = {
        start: false,
        stop: false
    };

    onEnd = () => {
        this.setState({ start: false, stop: false });
        this.props.action('end')()
    };

    onResult = ({ finalTranscript }) => {
        const result = finalTranscript;

        this.setState({ start: false });
        this.props.action('result')(finalTranscript)
    };

    handleStart = () => {
        this.setState({ start: true, stop: false });
    };

    handleStop = () => {
        this.setState({ start: false, stop: true });
    };

    render () {
        const { className } = this.props;
        let button = null;
        console.log(this.state);
        if (this.state.start) {
            button = <StopButton onClick={this.handleStop} />;
        } else {
            button = <StartButton onClick={this.handleStart} />;
        }

        return (
            <span className={className} styleName="microphone">
                {button}
                {this.state.start && (
                    <VoiceRecognition
                        //onStart={this.props.action('start')}
                        //onEnd={this.props.action('end')}
                        onResult={this.onResult}
                        continuous={true}
                        lang="en-US"
                        stop={this.state.stop}
                    />
                )}
            </span>
        )
    }
}

export default Microphone;

