import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router,Route} from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import Register from './components/Register';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <Route exact path='/' component={App}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
    </Router>
    
    , document.getElementById('root'));
serviceWorker.register();
