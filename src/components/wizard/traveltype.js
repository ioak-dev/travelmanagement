import React from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWizard, updateTravelType } from '../../actions/wizardActions';
import Clientinfo from './clientinfo';

class Traveltype extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        console.log('componentWillMount');
        this.setState({
            traveltype: this.props.traveltype}
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps");
        if (nextProps.traveltype) {
            this.setState({
                traveltype: nextProps.traveltype},
                () => {console.log(this.state)}
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            traveltype: {
                type: null
            }
        };

        this.domesticType = this.domesticType.bind(this);
        this.internationalType = this.internationalType.bind(this);
    }

    render() {
        if (this.state.traveltype.type === null) {
            return (
                <Container>
                    <br />
                    <br />
                    <br />
                    <Row className="justify-content-md-center">
                        <div className="arc-wizard-question">What type of travel request would you like to create?</div>
                    </Row>
                    <br></br>{this.state.traveltype.type}
                    <Row>
                        <Col xs={12} className="text-center">
                            <Button className="arc-button-decision" onClick={this.domesticType}>Domestic</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button className="arc-button-decision" onClick={this.internationalType}>International</Button>
                        </Col>
                    </Row>
                </Container>
            );
        } else if (this.state.traveltype.type === 'Domestic' || this.state.traveltype.type === 'International') {
            return (
                <Clientinfo />
            )
        }
    }

    domesticType(e) {
        e.preventDefault();
        
        this.setState(
            {traveltype: {type: 'Domestic'}},
            () => {this.props.updateTravelType(this.props.id, this.state);}
        );
    }

    internationalType(e) {
        e.preventDefault();
        this.setState(          
            {traveltype: {type: 'International'}},
            () => this.props.updateTravelType(this.props.id, this.state)
        );      
    }

}

Traveltype.protoTypes = {
    id: PropTypes.string.isRequired,
    updateTravelType: PropTypes.func.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    traveltype: PropTypes.object
}

const mapStateToProps = state => ({
    traveltype:  state.wizard.traveltype
})

export default connect(mapStateToProps, { fetchWizard, updateTravelType })(Traveltype)