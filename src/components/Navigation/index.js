import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

import { NavLink } from 'react-router-dom';

const Navigation = ({ isInfoEnabled, isSlicingEnabled, isKeywordingEnabled, isProcessingEnabled }) => {
    let info = null;
    let slicing = null;
    let keywording = null;
    let processing = null;
    if (isInfoEnabled) {
        info = <NavLink to="/info" activeClassName={styles.active}>Information</NavLink>;
    } else {
        info = <span>Information</span>;
    }
    if (isSlicingEnabled) {
        slicing = <NavLink to="/slicing" activeClassName={styles.active}>Slicing</NavLink>;
    } else {
        slicing = <span>Slicing</span>;
    }
    if (isKeywordingEnabled) {
        keywording = <NavLink to="/keywording" activeClassName={styles.active}>Keywording</NavLink>;
    } else {
        keywording = <span>Keywording</span>;
    }
    if (isProcessingEnabled) {
        processing = <NavLink to="/processing" activeClassName={styles.active}>Processing</NavLink>;
    } else {
        processing = <span>Processing</span>;
    }

    return (
        <ul styleName="navigation">
            <li><NavLink to="/" activeClassName={styles.active}>Video Upload</NavLink></li>
            <li>{info}</li>
            <li>{slicing}</li>
            <li>{keywording}</li>
            <li>{processing}</li>
        </ul>
    )
};

Navigation.propTypes = {
    isSlicingEnabled: PropTypes.bool,
    isKeywordingEnabled: PropTypes.bool,
    isProcessingEnabled: PropTypes.bool,
};

Navigation.defaultProps = {
    isSlicingEnabled: false,
    isKeywordingEnabled: false,
    isProcessingEnabled: false,
};

export default Navigation;

