import React, { Component} from 'react';
import { connect } from 'react-redux';
import { goToPreviousPage, goToNextPage, fetchWizard, updateWizard } from '../../actions/wizardActions';

const withWizard = (WrappedComponent, dataref) => {
    class Wrapper extends Component {
        componentDidMount() {
            this.props.fetchWizard("1");
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps[dataref]) {
                this.setState(
                    {
                        [dataref]: nextProps[dataref]
                    }
                )
            }
        }

        constructor(props) {
            super(props);

            this.state = {
                errorfields: [],
                errormessages: [],
                [dataref]: this.props[dataref]
            };

            this.handlechange = this.handlechange.bind(this);
        }

      
        handlechange(event) {
            this.setState(
                {
                    [dataref]: {
                        ...this.state[dataref],
                        [event.currentTarget.name]: event.currentTarget.value
                    }
                }
            )           
        }

        getReducerType() {
            return 'UPDATE_' + dataref.toUpperCase();
        }

        reportErrors(errorfields, errormessages) {
            this.setState({
                errorfields: errorfields,
                errormessages: errormessages
            })
        }

        nextPage(count) {
            this.props.updateWizard(this.getReducerType(), "1", this.state);
            this.props.goToNextPage(this.props.currentpage, count);
        }

        previousPage(count) {
            this.props.updateWizard(this.getReducerType(), "1", this.state);
            this.props.goToPreviousPage(this.props.currentpage, count);
        }

        saveForLater() {
            console.log(this.state);
            // call action to save
            // redirect to last page
        }

        validateMandatoryFields(...fields) {
            let errorfields = [];
            fields.map(field => {
                if (!this.state[dataref][field] || this.state[dataref][field] === '') {
                    errorfields.push(field);
                }
            })
            return errorfields;
        }


        render() {
            return (
                <WrappedComponent 
                    reportErrors={this.reportErrors.bind(this)}
                    handlechange={this.handlechange.bind(this)}
                    nextPage={this.nextPage.bind(this)}
                    previousPage={this.previousPage.bind(this)}
                    saveForLater={this.saveForLater.bind(this)}
                    validateMandatoryFields={this.validateMandatoryFields.bind(this)}
                    {...this.props} {...this.state} />
            );
        }

    }

    const mapStateToProps = state => ({
        currentpage: state.wizard.currentpage,
        traveltype:  state.wizard.traveltype,
        clientinfo:  state.wizard.clientinfo,
        purposeofvisit:  state.wizard.purposeofvisit,
        flightdetails:  state.wizard.flightdetails
    })
    
    return connect(mapStateToProps, { goToPreviousPage, goToNextPage, fetchWizard, updateWizard })(Wrapper);
}


export default withWizard;