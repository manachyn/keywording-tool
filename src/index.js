import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import Root from './containers/Root'

const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    applyMiddleware(thunk),
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
