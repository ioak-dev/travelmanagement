import React from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPreviousPage, goToNextPage, fetchWizard, updateClientinfo } from '../../actions/wizardActions';

class ClientInfo extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        console.log('componentWillMount');
        this.setState({
            traveltype: this.props.traveltype,
            clientinfo: this.props.clientinfo
        }
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps");
        console.log(nextProps);
        if (nextProps.clientinfo) {
            this.setState(
                {
                    clientinfo: nextProps.clientinfo,
                    traveltype: nextProps.traveltype
                },
                () => {console.log(this.state)}
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            traveltype: {
                type: null
            },
            clientinfo: {
                name: null
            }
        };

        this.domesticType = this.domesticType.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    render() {
        return (
            <Container>
                <br />
                <br />
                <br />
                <Row className="justify-content-md-center">
                    <div className="arc-wizard-question">What type of travel request would you like to create?</div>
                </Row>
                <br></br>
                <Row>
                    <Col xs={12} className="text-center">
                        <Button className="arc-button-decision" onClick={this.domesticType}>Client = Cisco</Button>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col xs={12} className="text-center">
                        <Button className="arc-button-decision" onClick={this.previousPage}>Previous</Button>
                        &nbsp;&nbsp;
                        <Button className="arc-button-decision" onClick={this.nextPage}>Next</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    domesticType(e) {
        e.preventDefault();
        
        this.setState(
            {clientinfo: {name: 'Cisco'}},
            () => {this.props.updateClientinfo(this.props.id, this.state);}
        );
    }

    previousPage(e) {
        e.preventDefault();
        this.props.updateClientinfo(this.props.id, this.state);
        this.props.goToPreviousPage(this.props.currentpage, 1);        
    }

    nextPage(e) {
        e.preventDefault();
        this.props.updateClientinfo(this.props.id, this.state);
        if (this.props.traveltype.type === 'Domestic') {
            this.props.goToNextPage(this.props.currentpage, 1);
        } else if (this.props.traveltype.type === 'International') {
            this.props.goToNextPage(this.props.currentpage, 2);
        } 
    }

}

ClientInfo.protoTypes = {
    id: PropTypes.string.isRequired,
    currentpage: PropTypes.number.isRequired,
    updateClientinfo: PropTypes.func.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    goToPreviousPage: PropTypes.func.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    traveltype: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    traveltype:  state.wizard.traveltype,
    clientinfo:  state.wizard.clientinfo
})

export default connect(mapStateToProps, { goToPreviousPage, goToNextPage, fetchWizard, updateClientinfo })(ClientInfo)