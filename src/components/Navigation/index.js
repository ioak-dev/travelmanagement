import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import './style.css'
import './../../index.css'

class Navigation extends React.Component {
    componentWillMount() {
    }

    componentWillUnmount() {
    this.props.onUnload();
    }

    render() {
        return (
        <Navbar className="arc-bg-primary" variant="dark" expand="lg">
          <Navbar.Brand href="#home">
          <div className="logo">
            <img src="https://westernacher-consulting.com/wp-content/uploads/2018/12/logo-retina.png" alt="Westernacher logo" className="tt-retina-logo" height="50"/>
          </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/createrequest">New Request</Nav.Link>
                <Nav.Link href="/viewrequests">View Requests</Nav.Link>
                <Nav.Link href="/login">User Account</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default Navigation;