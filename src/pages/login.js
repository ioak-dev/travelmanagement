import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {loggedInUserEmail: null};

        this.logout.bind(this);
    }

    componentDidMount() {
        this.initialize();
    }

    initialize() {
        if (sessionStorage.getItem('userSigninName')) {
            this.setState({loggedInUserEmail: sessionStorage.getItem('userSigninName')});
        } else {
            this.setState({loggedInUserEmail: null});
        }
    }

    render() {
        if (!this.state.loggedInUserEmail) {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                            <h1>You are not logged in</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                            <a href="/login" id="connect-button">Sign in using Exchange 365</a>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>You are logged in as {this.state.loggedInUserEmail}</h1>
                    </Row>
                    <Row className="justify-content-md-center">                    
                        <Button className="arc-button-primary" onClick={() => {this.logout()}}>Logout</Button>
                    </Row>
                </Container>
            );
        }
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        this.initialize();
    }
}
export default Login