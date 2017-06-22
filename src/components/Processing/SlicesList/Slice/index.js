import React from 'react';
import './styles.css';

const Slice = (props) => (
    <div styleName="slice">
        <video controls>
            <source src={props.url} type="video/mp4" />
        </video>
    </div>
);

export default Slice;

