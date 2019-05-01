import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import {FormControlLabel, Grid, Radio, RadioGroup, Typography} from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';

const componentName = "clientinfo";

const ClientInfo = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Grid item xs={12}>
                    <WizardFlow headline="Client Details"
                                previouspage={previousPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} nextpage={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

                <br />
                <Grid item xs={12}>
                    <ArcTextField id={componentName} label="Customer Name*" name="name" handlechange={e => props.handlechange(e)}   {...props}
                                  error={props.errorfields.indexOf("name") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <ArcTextField id={componentName} label="City*" name="city" handlechange={e => props.handlechange(e)}   {...props}
                                  error={props.errorfields.indexOf("city") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <ArcTextField id={componentName} label="Country*" name="country" handlechange={e => props.handlechange(e)}   {...props}
                                  error={props.errorfields.indexOf("country") > -1}/>
                </Grid>

            </Grid>


        </form>
    </div>

function previousPage(props) {
    props.previousPage(1);
}

function nextPage(props) {
    if (validate(props).length === 0) {
        props.nextPage(1);
    }
}

function validate(props) {
    const errorfields = props.validateMandatoryFields('name','country','city');
    const errormessages = [];

    if (errorfields.length > 0) {
        errormessages.push("Mandatory fields missing");
    }

    props.reportErrors(errorfields, errormessages);

    return errorfields;
}



ClientInfo.protoTypes = {
    clientinfo: PropTypes.object
}

export default withWizard(ClientInfo, componentName)
