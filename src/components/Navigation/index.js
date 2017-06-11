import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

import { NavLink } from 'react-router-dom';

const Navigation = ({ isSlicingEnabled, isKeywordingEnabled }) => {
    let slicing = null;
    let keywording = null;
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

    return (
        <ul styleName="navigation">
            <li><NavLink to="/" activeClassName={styles.active}>Video Upload</NavLink></li>
            <li>{slicing}</li>
            <li>{keywording}</li>
        </ul>
    )
};

Navigation.propTypes = {
    isSlicingEnabled: PropTypes.bool,
    isKeywordingEnabled: PropTypes.bool
};

Navigation.defaultProps = {
    isSlicingEnabled: false,
    isKeywordingEnabled: false
};

export default Navigation;

