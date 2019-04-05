import React from 'react'
import Login from './login'
import { Container, Row, Button, Col } from 'react-bootstrap';

class CreateRequest extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {loggedInUserEmail: null};
    }

    componentDidMount() {
        if (sessionStorage.getItem('userSigninName')) {
            this.setState({loggedInUserEmail: sessionStorage.getItem('userSigninName')});
        }
    }

    render() {
        if (!this.state.loggedInUserEmail) {
            return (
                <Login />
            );
        } else {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>Create new travel request</h1>
                    </Row>
                    {/* <Row>
                        <Col xs={12} className="text-center">
                            <Button className="arc-button-primary">Save and continue later</Button>
                        </Col>
                    </Row> */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <Row className="justify-content-md-center">
                        <div className="arc-wizard-question">What type of travel request would you like to create?</div>
                    </Row>
                    <br></br>
                    <Row>
                        <Col xs={12} className="text-center">
                            <Button className="arc-button-decision">Domestic</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button className="arc-button-decision">International</Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}
export default CreateRequest