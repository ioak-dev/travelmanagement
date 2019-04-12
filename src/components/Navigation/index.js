import React from 'react';
import './style.css'
import './../../index.css'

import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  grow: {
    flexGrow: 1,
  }
};

class Navigation extends React.Component {
    componentWillMount() {
      console.log(window.location.pathname);
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

    getMenuItemVariant(path) {
      if (window.location.pathname === path) {
        return 'contained';
      }
      return 'text';
    }

    render() {
        return (
        // <Navbar className="arc-bg-primary" variant="dark" expand="lg">
        //   <Navbar.Brand href="#home">
        //   <div className="logo">
        //     <img src="https://westernacher-consulting.com/wp-content/uploads/2018/12/logo-retina.png" alt="Westernacher logo" className="tt-retina-logo" height="50"/>
        //   </div>
        //   </Navbar.Brand>
        //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //       <Nav className="mr-auto">
        //         <Nav.Link href="/home">Home</Nav.Link>
        //         <Nav.Link href="/createrequest">New Request</Nav.Link>
        //         <Nav.Link href="/viewrequests">View Requests</Nav.Link>
        //         <Nav.Link href="/login">User Account</Nav.Link>
        //       </Nav>
        //     </Navbar.Collapse>
        // </Navbar>
        <div>
          <AppBar position="static">
            <Toolbar>
              <div className="logo">
                <img src="https://westernacher-consulting.com/wp-content/uploads/2018/12/logo-retina.png" alt="Westernacher logo" className="tt-retina-logo" height="50"/>
              </div>
              <IconButton className="arc-menu-button" color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Button variant={this.getMenuItemVariant('/home')} color={this.getMenuItemColor('/home')} href="/home">Home</Button>
              <Button variant={this.getMenuItemVariant('/createrequest')} color={this.getMenuItemColor('/createrequest')} href="/createrequest">Create Request</Button>
              <Button variant={this.getMenuItemVariant('/viewrequests')} color={this.getMenuItemColor('/viewrequests')} href="/viewrequests">View Requests</Button>
              <Button variant={this.getMenuItemVariant('/login')} color={this.getMenuItemColor('/login')} href="/login">Account</Button>
            </Toolbar>
          </AppBar>
        </div>
        );
    }
}

export default Navigation;