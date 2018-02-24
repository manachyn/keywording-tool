import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import { persistStore, persistCombineReducers } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const config = {
    key: 'root',
    storage: session,
    whitelist: ['slices']
};

const reducer = persistCombineReducers(config, reducers);

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const configureStore = preloadedState => {
    let store = createStore(
        reducer,
        preloadedState,
        enhancer
    );
    let persistor = persistStore(store);

    return { persistor, store }
};

export default configureStore;

