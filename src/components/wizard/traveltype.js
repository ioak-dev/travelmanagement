import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToNextPage, fetchWizard, updateTravelType } from '../../actions/wizardActions';
import ErrorMessage from '../errormessage';

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
            errors: [],
            traveltype: {
                type: null
            }
        };

        this.domesticType = this.domesticType.bind(this);
        this.internationalType = this.internationalType.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    render() {
        return (
                // <ErrorMessage errors={this.state.errors} />
                // <br />
                // <br />
                // <br />
                // <Row className="justify-content-md-center">
                //     <div className="arc-wizard-question">What type of travel request would you like to create?</div>
                // </Row>
                // <br />
                // <br />
                // <Row>
                //     <Col xs={12} className="text-center">
                //         <Button className="arc-button-decision" onClick={this.domesticType}>Domestic</Button>
                //         &nbsp;&nbsp;&nbsp;
                //         <Button className="arc-button-decision" onClick={this.internationalType}>International</Button>
                //     </Col>
                // </Row>
                // <br />
                // <br />
                // <Row>
                //     <Col xs={12} className="text-center">
                //         <Button className="arc-button-decision" onClick={this.nextPage}>Next</Button>
                //     </Col>
                // </Row>
                <h1>Travel type</h1>
        );
    }

    domesticType(e) {
        e.preventDefault();
        
        this.setState(
            {traveltype: {type: 'Domestic'}},
            () => this.props.updateTravelType(this.props.id, this.state)
        );
    }

    internationalType(e) {
        e.preventDefault();
        this.setState(          
            {traveltype: {type: 'International'}},
            () => this.props.updateTravelType(this.props.id, this.state)
        );      
    }

    nextPage(e) {
        e.preventDefault();
        {
            const errors = this.validate();
            
            this.setState({
                errors: errors
            })
            
            // On success only
            if (errors.length === 0) {
                // On success update state
                this.props.updateTravelType(this.props.id, this.state);
                // On success move to next page
                this.props.goToNextPage(this.props.currentpage, 1);
            }
        }
    }

    validate() {
        // Validation step with series of validation on all fields
        const errors = [];
        if (this.state.traveltype.type === null) {
            errors.push("Travel type is not selected!");
        }
        return errors;
    }
}

Traveltype.protoTypes = {
    id: PropTypes.string.isRequired,
    updateTravelType: PropTypes.func.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    currentpage: PropTypes.string,
    traveltype: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    traveltype:  state.wizard.traveltype
})

export default connect(mapStateToProps, { goToNextPage, fetchWizard, updateTravelType })(Traveltype)