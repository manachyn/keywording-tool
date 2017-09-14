import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Navigation from '../containers/Navigation';
import FlashMessages from '../containers/FlashMessagesList';
import Upload from '../pages/Upload';
import Info from '../pages/Info';
import Slicing from '../pages/Slicing';
import Editing from '../pages/Editing';
import Processing from '../pages/Processing';

import Grid from 'react-bootstrap/lib/Grid';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Grid bsClass="container-fluid">
                <Navigation/>
                <FlashMessages/>
                <Route exact path="/" component={Upload}/>
                {/*<Route exact path="/" component={Info}/>*/}
                <Route path="/info" component={Info}/>
                <Route path="/slicing" component={Slicing}/>
                <Route path="/editing" component={Editing}/>
                <Route path="/processing" component={Processing}/>
            </Grid>
        </ConnectedRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;