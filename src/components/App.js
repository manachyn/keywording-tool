import React from 'react';
import styles from './App.css';
import Video from './Video';
import Timeline from "./Timeline/index";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// const App = (ddd) => (
//     <div className={styles.app}>
//         <Video preload="auto" controls>
//             <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
//         </Video>
//         <Timeline src="http://vjs.zencdn.net/v/oceans.mp4" />
//     </div>
// );

const App = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Upload</Link></li>
                <li><Link to="/slicing">Slicing</Link></li>
                <li><Link to="/keywording">Keywording</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Upload}/>
            <Route path="/about" component={Slicing}/>
            <Route path="/topics" component={Keywording}/>
        </div>
    </Router>
);

export default App;

