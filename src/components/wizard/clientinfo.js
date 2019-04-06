import React from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWizard, updateClientinfo } from '../../actions/wizardActions';
import Clientinfo from './clientinfo';

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
    }

    render() {
        // if (this.state.traveltype.type === null) {
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
                </Container>
            );
        // } else if (this.state.traveltype.type === 'Domestic' || this.state.traveltype.type === 'International') {
        //     return (
        //         <Clientinfo />
        //     )
        // }
    }

    domesticType(e) {
        e.preventDefault();
        
        this.setState(
            {clientinfo: {name: 'Cisco'}},
            () => {this.props.updateClientinfo(this.props.id, this.state);}
        );
    }

}

ClientInfo.protoTypes = {
    id: PropTypes.string.isRequired,
    updateClientinfo: PropTypes.func.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    traveltype: PropTypes.object
}

const mapStateToProps = state => ({
    traveltype:  state.wizard.traveltype,
    clientinfo:  state.wizard.clientinfo
})

export default connect(mapStateToProps, { fetchWizard, updateClientinfo })(ClientInfo)