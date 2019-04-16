import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    goToPreviousPage,
    goToNextPage,
    fetchWizard,
    updateHoteldetails
} from '../../actions/wizardActions';
import ErrorMessage from "./errormessage";

class Hoteldetails extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        this.setState({
            errors: [],
            hoteldetails: this.props.hoteldetails
        }
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hoteldetails) {
            this.setState(
                {
                    hoteldetails: nextProps.hoteldetails
                },
                () => {console.log(this.state)}
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            hoteldetails: {
                name: '',
                address:'',
                staycost:'',
                billabletoclient:'',
                duration:'',
                remarks:''
            }
        };

        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            // <Container>
            //     <ErrorMessage errors={this.state.errors} />
            //     <br />
            //     <Row className="justify-content-md-center">
            //         <div className="arc-wizard-question">Provide Accommodation Details</div>
            //     </Row>
            //     <br />
            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="name"
            //                     value={this.state.hoteldetails.name}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Hotel Name</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup>

            //                 <FormControl name="address"
            //                              value={this.state.hoteldetails.address}
            //                              onChange={e => this.handleChange(e)}
            //                              as="textarea"/>
            //                 <InputGroup.Append>
            //                     <InputGroup.Text>Hotel Address</InputGroup.Text>
            //                 </InputGroup.Append>

            //             </InputGroup>
            //         </Col>
            //     </Row>
            //     <br/>
            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="staycost"
            //                     value={this.state.hoteldetails.staycost}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Stay Cost</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="billabletoclient"
            //                     value={this.state.hoteldetails.billabletoclient}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Billable to Client</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="duration"
            //                     value={this.state.hoteldetails.duration}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Duration</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="remarks"
            //                     value={this.state.hoteldetails.remarks}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Remarks</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>
            //     <br />
            //     <Row>
            //         <Col xs={12} className="text-center">
            //             <Button className="arc-button-decision" onClick={this.previousPage}>Previous</Button>
            //             &nbsp;&nbsp;
            //             <Button className="arc-button-decision" onClick={this.nextPage}>Next</Button>
            //         </Col>
            //     </Row>

            // </Container>
            <h2>hoteldetails</h2>
        );
    }

    previousPage(e) {
        e.preventDefault();
        this.props.updateHoteldetails(this.props.id, this.state);
        this.props.goToPreviousPage(this.props.currentpage, 1);        
    }

    handleChange(event) {
        this.setState(
            {
                hoteldetails: {
                    ...this.state.hoteldetails,
                    [event.currentTarget.name]: event.currentTarget.value
                }
            }
        );
    }

    nextPage(e) {
        e.preventDefault();
        this.props.updateHoteldetails(this.props.id, this.state);
        this.props.goToNextPage(this.props.currentpage, 1);
    }
}

Hoteldetails.protoTypes = {
    id: PropTypes.string.isRequired,
    currentpage: PropTypes.number.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    goToPreviousPage: PropTypes.func.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    hoteldetails: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    hoteldetails:  state.wizard.hoteldetails
})

export default connect(mapStateToProps, { goToPreviousPage, goToNextPage, fetchWizard, updateHoteldetails })(Hoteldetails)
