import React from 'react';
import FontAwesome from 'react-fontawesome';

const StartButton = ({ onClick }) => (
    <FontAwesome name='microphone' style={{ cursor: 'pointer', fontSize: '18px' }} onClick={onClick} />
);
export default StartButton;