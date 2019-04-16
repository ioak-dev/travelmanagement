import React from 'react'
import Login from './login';

class ViewRequests extends React.Component {
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
                // <Container>
                //   <Row className="justify-content-md-center">
                //       <h2>Your requests</h2>
                //   </Row>
                //   <br></br>
                //     <Row className="justify-content-md-center">
                //       <Col>
                //         <Table striped bordered hover>
                //           <thead>
                //             <tr>
                //               <th>#</th>
                //               <th>Customer</th>
                //               <th>From</th>
                //               <th>To</th>
                //             </tr>
                //           </thead>
                //           <tbody>
                //             <tr>
                //               <td>1</td>
                //               <td>Cisco</td>
                //               <td>Bangalore, India</td>
                //               <td>London, United Kingdom</td>
                //             </tr>
                //             <tr>
                //               <td>2</td>
                //               <td>Dell</td>
                //               <td>Hyderabad, India</td>
                //               <td>Paris, France</td>
                //             </tr>
                //           </tbody>
                //         </Table>
                //       </Col>                       
                //     </Row>
                // </Container>
                <h1>view requests</h1>
            );
        }
    }
}
export default ViewRequests