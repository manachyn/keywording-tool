import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Navigation from '../containers/Navigation';
import Upload from '../pages/Upload';
import Info from '../pages/Info';
import Slicing from '../pages/Slicing';
import Keywording from '../pages/Keywording';
import Processing from '../pages/Processing';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Navigation/>
                {/*<Route exact path="/" component={Upload}/>*/}
                <Route exact path="/" component={Info}/>
                {/*<Route path="/info" component={Info}/>*/}
                <Route path="/slicing" component={Slicing}/>
                <Route path="/keywording" component={Keywording}/>
                <Route path="/processing" component={Processing}/>
            </div>
        </ConnectedRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;