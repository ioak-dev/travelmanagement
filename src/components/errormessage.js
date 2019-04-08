import React from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              {this.props.errors.length > 0 && <div className="arc-errormessage">{this.props.errors}</div>}
            </Col>
          </Row>
        </Container>
    );
  }
  
}

ErrorMessage.protoTypes = {
  errors: PropTypes.array.isRequired
}

export default ErrorMessage