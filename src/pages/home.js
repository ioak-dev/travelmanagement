import React from 'react'
import { Row, Container } from 'react-bootstrap';
class Home extends React.Component {
  componentDidMount() {
    console.log(sessionStorage.getItem('userSigninName'));
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <h1>Home</h1>
        </Row>
      </Container>
    );
  }

}
export default Home