import React from 'react';
import './style.css'
import './../../index.css'
import Hidden from '@material-ui/core/Hidden';

import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, ListItemIcon, ListItem, List, Drawer, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ArcButtonNavWrapper from './arc-button-nav-wrapper.jsx';

import { connect } from 'react-redux';
import { fetchLoggedUser, reloadLoggedUser } from '../../actions/userActions';

const arcNavTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
          main: '#3F517C'
          // 466983
      },
      secondary: {
          main: '#D8C568'
          // FFCA3A
      },
      textSecondary: {
        color: '#FFFFFF'
      }
    }
  });

  // ?? F0F0DF
  
const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
    },
    menuButton: {
      marginRight: 20,
      marginLeft: -12
    }
  };

class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        drawer: false
      }
    }

    componentDidMount() {
      this.props.reloadLoggedUser(sessionStorage.getItem('userSigninName'));
      // this.props.fetchLoggedUser();
    }

    componentWillUnmount() {
    this.props.onUnload();
    }

    getMenuItemColor(path) {
      if (window.location.pathname === path) {
        return 'secondary';
      }
      return 'inherit';
    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
    }

    // getMenuItemVariant(path) {
    //   if (window.location.pathname === path) {
    //     return 'text';
    //   }
    //   return 'text';
    // }

    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open
      });
    };

    render() {

      const LINK_HOME = <ArcButtonNavWrapper size="small" getMenuItemColor={this.getMenuItemColor.bind(this)} pathname="/home" label="Home" />;
      const LINK_CREATE_REQUEST = <ArcButtonNavWrapper size="small" getMenuItemColor={this.getMenuItemColor.bind(this)} pathname="/createrequest" label="Create Request" />;
      const LINK_VIEW_REQUESTS = <ArcButtonNavWrapper size="small" getMenuItemColor={this.getMenuItemColor.bind(this)} pathname="/viewrequests" label="View Requests" />;
      const LINK_CONTROL_REQUESTS = <ArcButtonNavWrapper size="small" getMenuItemColor={this.getMenuItemColor.bind(this)} pathname="/controlrequests" label="Control Requests" />;
      const LINK_USER_ADMINISTRATION = <ArcButtonNavWrapper size="small" getMenuItemColor={this.getMenuItemColor.bind(this)} pathname="/useradministration" label="User Administration" />;
      
        
      const sideList = (
        <div>
          <Typography variant="h2">Menu</Typography>
          <List>
              <ListItem>
                <ListItemIcon><i className="material-icons">home</i></ListItemIcon>
                {LINK_HOME}
              </ListItem>
              <ListItem>
                <ListItemIcon><i className="material-icons">create</i></ListItemIcon>
                {LINK_CREATE_REQUEST}
              </ListItem>
              <ListItem>
                <ListItemIcon><i className="material-icons">subject</i></ListItemIcon>
                {LINK_VIEW_REQUESTS}
              </ListItem>
              <ListItem>
                <ListItemIcon><i className="material-icons">code</i></ListItemIcon>
                {LINK_CONTROL_REQUESTS}
              </ListItem>
              <ListItem>
                <ListItemIcon><i className="material-icons">person</i></ListItemIcon>
                {LINK_USER_ADMINISTRATION}
              </ListItem>
          </List>
        </div>
      );

      return (
        <MuiThemeProvider theme={arcNavTheme}>
          <AppBar position="static">
            <Toolbar>
              <Hidden smUp smUp>
                <IconButton className="arc-menu-button" color="inherit" aria-label="Menu" onClick={this.toggleDrawer('drawer', true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer open={this.state.drawer} anchor="right" onClose={this.toggleDrawer('drawer', false)}>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('drawer', false)}
                    onKeyDown={this.toggleDrawer('drawer', false)}
                  >
                    {sideList}
                  </div>
                </Drawer>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </Hidden>
            
              <div className="logo">
                <img src="https://westernacher-consulting.com/wp-content/uploads/2018/12/logo-retina.png" alt="Westernacher logo" className="tt-retina-logo" height="50"/>
              </div>
              
              <Hidden smDown>
                {LINK_HOME}
                {LINK_CREATE_REQUEST}
                {LINK_VIEW_REQUESTS}
                {LINK_CONTROL_REQUESTS}
                {LINK_USER_ADMINISTRATION}
              </Hidden>
              
              {/* Right icons */}
              <div style={styles.toolbarButtons}></div>
              <Hidden smDown>
                <Typography variant="body1" color="textSecondary">{this.props.loggedUser.displayname}</Typography>
              </Hidden>
              <IconButton color="inherit" aria-label="Account" href="/login">
                <i className="material-icons">account_circle</i>
              </IconButton>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      );
    }
}

const mapStateToProps = state => ({
    loggedUser: state.user.loggedUser
})

export default connect(mapStateToProps, {fetchLoggedUser, reloadLoggedUser}) (Navigation);