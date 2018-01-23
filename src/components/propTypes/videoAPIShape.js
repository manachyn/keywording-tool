import PropTypes from 'prop-types';

const { func, shape } = PropTypes;

export default shape({
    toggleMute: func.isRequired,
    toggleLoop: func.isRequired,
    play: func.isRequired,
    pause: func.isRequired,
    togglePlay: func.isRequired,
    toggleFullScreen: func.isRequired,
    setVolume: func.isRequired,
    setPlaybackRate: func.isRequired,
    seek: func.isRequired
});