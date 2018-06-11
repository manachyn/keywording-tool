import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

import { NavLink } from 'react-router-dom';

const Navigation = ({ isInfoEnabled, isSlicingEnabled, isEditingEnabled, isProcessingEnabled }) => {
    let info = null;
    let slicing = null;
    let editing = null;
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
    if (isEditingEnabled) {
        editing = <NavLink to="/editing" activeClassName={styles.active}>Keywording</NavLink>;
    } else {
        editing = <span>Keywording</span>;
    }
    if (isProcessingEnabled) {
        processing = <NavLink to="/processing" activeClassName={styles.active}>Processing</NavLink>;
    } else {
        processing = <span>Processing</span>;
    }

    return (
        <ul styleName="navigation">
            <li><NavLink to="/" exact activeClassName={styles.active}>Video Upload</NavLink></li>
            <li>{info}</li>
            <li>{slicing}</li>
            <li>{editing}</li>
            <li>{processing}</li>
        </ul>
    )
};

Navigation.propTypes = {
    isSlicingEnabled: PropTypes.bool,
    isEditingEnabled: PropTypes.bool,
    isProcessingEnabled: PropTypes.bool,
};

Navigation.defaultProps = {
    isSlicingEnabled: false,
    isEditingEnabled: false,
    isProcessingEnabled: false,
};

export default Navigation;

