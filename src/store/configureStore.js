import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

const history = createHistory();
const middleware = routerMiddleware(history);

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(middleware)
    );
}
