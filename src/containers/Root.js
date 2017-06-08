import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { hasSelectedVideo } from '../modules/uploads/reducers/videos';

import Upload from '../pages/Upload';
import Slicing from '../pages/Slicing';
import Keywording from '../pages/Keywording';

const Root = ({ store, history, isSlicingEnabled, isKeywordingEnabled }) => {
    let slicing = null;
    let keywording = null;
    if (isSlicingEnabled) {
        slicing = <Link to="/slicing">Slicing</Link>;
    } else {
        slicing = <span>Slicing</span>;
    }
    if (isKeywordingEnabled) {
        keywording = <Link to="/keywording">Keywording</Link>;
    } else {
        keywording = <span>Keywording</span>;
    }

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <ul>
                        <li><Link to="/">Upload</Link></li>
                        <li>{slicing}</li>
                        <li>{keywording}</li>
                    </ul>

                    <Route exact path="/" component={Upload}/>
                    {/*<Route exact path="/" component={Slicing}/>*/}
                    <Route path="/slicing" component={Slicing}/>
                    <Route path="/keywording" component={Keywording}/>
                </div>
            </ConnectedRouter>
        </Provider>
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isSlicingEnabled: PropTypes.bool,
    isKeywordingEnabled: PropTypes.bool
};

Root.defaultProps = {
    isSlicingEnabled: false,
    isKeywordingEnabled: false
};

const mapStateToProps = (state) => {
    return {
        isSlicingEnabled: hasSelectedVideo(state.videos)
    }
};

export default connect(
    mapStateToProps
)(Root);
