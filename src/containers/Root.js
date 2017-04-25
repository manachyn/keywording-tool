import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Upload from '../pages/Upload';
import Slicing from '../pages/Slicing';
import Keywording from '../pages/Keywording';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <ul>
                    <li><Link to="/">Upload</Link></li>
                    <li><Link to="/slicing">Slicing</Link></li>
                    <li><Link to="/keywording">Keywording</Link></li>
                </ul>

                <Route exact path="/" component={Upload}/>
                <Route path="/slicing" component={Slicing}/>
                <Route path="/keywording" component={Keywording}/>
            </div>
        </ConnectedRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;
