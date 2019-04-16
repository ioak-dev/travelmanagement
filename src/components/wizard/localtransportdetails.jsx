import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    goToPreviousPage,
    goToNextPage,
    fetchWizard,
    updatePurposeofvisit,
    updateLocaltransportdetails
} from '../../actions/wizardActions';
import ErrorMessage from "./errormessage";

class Localtransportdetails extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        this.setState({
            errors: [],
                localtransportdetails: this.props.localtransportdetails
        }
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.localtransportdetails) {
            this.setState(
                {
                    localtransportdetails: nextProps.localtransportdetails
                },
                () => {console.log(this.state)}
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            localtransportdetails: {
                dateandtime: '',
                sector1:'',
                dateandtimereturn:'',
                sector2:'',
                billabletoclient:'',
                remarks1:'',
                remarks2:''
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
            //         <div className="arc-wizard-question">Provide Local Transport Details</div>
            //     </Row>
            //     <br />

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="dateandtime"
            //                     value={this.state.localtransportdetails.dateandtime}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Date And Time</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="sector1"
            //                     value={this.state.localtransportdetails.sector1}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Sector</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="dateandtimereturn"
            //                     value={this.state.localtransportdetails.dateandtimereturn}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Return Date And Time</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="sector2"
            //                     value={this.state.localtransportdetails.sector2}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Sector</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>

            //     <Row>
            //     <Col xs={3}></Col>
            //     <Col xs={6} className="text-center">
            //         <InputGroup size="sm" className="mb-3">
            //             <FormControl
            //                 name="billabletoclient"
            //                 value={this.state.localtransportdetails.billabletoclient}
            //                 onChange={e => this.handleChange(e)}
            //                 aria-describedby="inputGroup-sizing-sm" />
            //             <InputGroup.Append>
            //                 <InputGroup.Text id="inputGroup-sizing-sm">Billable to Client</InputGroup.Text>
            //             </InputGroup.Append>
            //         </InputGroup>
            //     </Col>
            // </Row>
            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="remarks1"
            //                     value={this.state.localtransportdetails.remarks1}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Remarks on Dinning Allowance if any</InputGroup.Text>
            //                 </InputGroup.Append>
            //             </InputGroup>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col xs={3}></Col>
            //         <Col xs={6} className="text-center">
            //             <InputGroup size="sm" className="mb-3">
            //                 <FormControl
            //                     name="remarks2"
            //                     value={this.state.localtransportdetails.remarks2}
            //                     onChange={e => this.handleChange(e)}
            //                     aria-describedby="inputGroup-sizing-sm" />
            //                 <InputGroup.Append>
            //                     <InputGroup.Text id="inputGroup-sizing-sm">Remarks on Travel Allowance if any</InputGroup.Text>
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
            <h2>localtransportdetails</h2>
        );
    }

    previousPage(e) {
        e.preventDefault();
        this.props.updateLocaltransportdetails(this.props.id, this.state);
        this.props.goToPreviousPage(this.props.currentpage, 1);        
    }

    handleChange(event) {
        this.setState(
            {
                localtransportdetails: {
                    ...this.state.localtransportdetails,
                    [event.currentTarget.name]: event.currentTarget.value
                }
            }
        );
    }

    nextPage(e) {
        e.preventDefault();
        this.props.updateLocaltransportdetails(this.props.id, this.state);
        this.props.goToNextPage(this.props.currentpage, 1);
    }
}

Localtransportdetails.protoTypes = {
    id: PropTypes.string.isRequired,
    currentpage: PropTypes.number.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    goToPreviousPage: PropTypes.func.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    localtransportdetails: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    localtransportdetails:  state.wizard.localtransportdetails
})

export default connect(mapStateToProps, { goToPreviousPage, goToNextPage, fetchWizard, updateLocaltransportdetails })(Localtransportdetails)
