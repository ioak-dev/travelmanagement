import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Login from './pages/login';
import Home from './pages/home';
import CreateRequest from './pages/createrequest';
import ViewRequests from './pages/viewrequests';
import Navigation from './components/Navigation';
import * as serviceWorker from './serviceWorker';

const routing = (
    <div className="App">
        <Navigation />
        <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/createrequest" component={CreateRequest} />
            <Route path="/viewrequests" component={ViewRequests} />
        </div>
        </Router>
    </div>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
