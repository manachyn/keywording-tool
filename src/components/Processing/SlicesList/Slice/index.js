import React from 'react';
import './styles.css';

const Slice = (props) => (
    <div styleName="slice">
        <video controls>
            <source src={props.url} type="video/mp4" />
        </video>
        <div><pre>{JSON.stringify(props.info)}</pre></div>
    </div>
);

export default Slice;

