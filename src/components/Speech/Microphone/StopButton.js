import React from 'react';
import FontAwesome from 'react-fontawesome';

const StopButton = ({ onClick }) => (
    <FontAwesome name='microphone' style={{ cursor: 'pointer', fontSize: '18px', color: '#0066CB' }} onClick={onClick} />
);

export default StopButton;