import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import CreateRequest from './pages/createrequest';
import ViewRequests from './pages/viewrequests';

import Navigation from './components/Navigation';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const arcTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
          main: '#3F517C'          
      },
      secondary: {
          main: '#A38F2D'
      }
    }
  });

// 41558F B4882A B'DAZZLED BLUE / UNIVERSITY OF CALIFORNIA GOLD
// 466983 CC944B QUEEN BLUE / AZTEC GOLD
// 3F517C B1A256 PURPLE NAVY / BRASS
// 3F517C A38F2D PURPLE NAVY / UNIVERSITY OF CALIFORNIA GOLD


// ?? 579C87/A0B37B/9CB56C/C9B13A

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={arcTheme}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/createrequest" component={CreateRequest} />
          <Route path="/viewrequests" component={ViewRequests} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
