import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPreviousPage, goToNextPage, fetchWizard, updateClientinfo } from '../../actions/wizardActions';
import ErrorMessage from "./errormessage";

import ArcTextField from '../../components/ui/elements/arc-text-field';
import { Grid } from '@material-ui/core';
import WizardFlow from './wizard-flow';

const componentName = "clientinfo";

class ClientInfo extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        this.setState({
            errors: [],
            traveltype: this.props.traveltype,
            clientinfo: this.props.clientinfo
        }
        );
    }

    componentWillReceiveProps(nextProps) {
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
            errorfields: [],
            errormessages: []
        };

        this.previousPageAction = this.previousPageAction.bind(this);
        this.nextpage = this.nextpage.bind(this);
        this.saveforlater = this.saveforlater.bind(this)
        this.handlechange = this.handlechange.bind(this);
    }

    render() {

        return (
            <div className="arc-root">

                <form noValidate autoComplete="off">                   
                    <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                            <WizardFlow previouspage={this.previousPageAction.bind(this)} saveforlater={this.saveforlater.bind(this)} nextpage={this.nextpage.bind(this)} />
                            </Grid>            
                        </Grid>
                        <ErrorMessage errors={this.state.errormessages} />

                        <Grid item xs={12}>
                            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                                <Grid item xs={12}>
                                    <ArcTextField id={componentName} label="Customer Name*" name="name" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("name") > -1}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="Address line 1*" name="address1" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("address1") > -1}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="Address line 2" name="address2" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("address2") > -1}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="City*" name="city" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("city") > -1}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="State*" name="statee" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("statee") > -1}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="Country*" name="country" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("country") > -1}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="Zipcode / Pincode*" name="zipcode" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("zipcode") > -1}/>
                                </Grid>                                
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>

        );
    }

    previousPageAction(e) {
        e.preventDefault();
        this.props.updateClientinfo(this.props.id, this.state);
        this.props.goToPreviousPage(this.props.currentpage, 1);        
    }

    handlechange(event) {
        this.setState(
            {
                clientinfo: {
                    ...this.state.clientinfo,
                    [event.currentTarget.name]: event.currentTarget.value
                }
            }
        );
    }

    saveforlater(e) {
        e.preventDefault();
        // call action to save
        // redirect to last page
    }

    nextpage(e) {
        e.preventDefault();
        const errorfields = this.validate();

        this.setState({
            errorfields: errorfields
        });

        // On success only
        if (errorfields.length === 0) {
            this.nextPageAction();
        }
    }

    nextPageAction(e) {
        this.props.updateClientinfo(this.props.id, this.state);
        this.props.goToNextPage(this.props.currentpage, 1);
    }

    validateMandatoryFields(...fields) {
        let errorfields = [];
        fields.map(field => {
            if (!this.state[componentName][field] || this.state[componentName][field] === '') {
                errorfields.push(field);
            }
        })
        return errorfields;
    }


    validate() {
        
        const errorfields = this.validateMandatoryFields('name', 'address1', 'city', 'statee', 'country', 'zipcode');      
        const errormessages = [];

        if (errorfields.length > 0) {
            errormessages.push("Mandatory fields missing");
        }

        // Series of business validations
        if (isNaN(this.state.clientinfo.zipcode)) {
            errorfields.push("zipcode");
            errormessages.push("Not a valid Zip code");
        }

        this.setState({
            errormessages: errormessages
        });

        return errorfields;
    }
}

ClientInfo.protoTypes = {
    id: PropTypes.string.isRequired,
    currentpage: PropTypes.number.isRequired,
    updateClientinfo: PropTypes.func.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    goToPreviousPage: PropTypes.func.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    traveltype: PropTypes.object,
    clientinfo: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    traveltype:  state.wizard.traveltype,
    clientinfo:  state.wizard.clientinfo
})

export default connect(mapStateToProps, { goToPreviousPage, goToNextPage, fetchWizard, updateClientinfo })(ClientInfo)
