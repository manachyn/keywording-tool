import React from 'react';

import Video from './../../containers/Video';
import Timeline from "./../../containers/Timeline";

const Slicing = () => (
    <div>
        <Video preload="auto" controls>
            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </Video>
        <Timeline src="http://vjs.zencdn.net/v/oceans.mp4" />
    </div>
);

export default Slicing;