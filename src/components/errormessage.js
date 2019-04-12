import React from 'react'
import PropTypes from 'prop-types';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        // <Container>
        //   <Row>
        //     <Col xs={12} className="text-center">
        //       {this.props.errors.length > 0 && <div className="arc-errormessage">{this.props.errors}</div>}
        //     </Col>
        //   </Row>
        // </Container>
        <h1>ErrorMessage</h1>
    );
  }
  
}

ErrorMessage.protoTypes = {
  errors: PropTypes.array.isRequired
}

export default ErrorMessage