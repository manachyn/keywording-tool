import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import Root from './containers/Root'

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    combineReducers({
        rootReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
