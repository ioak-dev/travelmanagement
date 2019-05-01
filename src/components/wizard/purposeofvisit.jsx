import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import { Grid } from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';

const componentName = "purposeofvisit";

const Purposeofvisit = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <WizardFlow headline="Purpose of visit" 
                        previouspage={previousPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} nextpage={nextPage.bind(this, props)} />
                </Grid>
                
                <ErrorMessage errors={props.errormessages} />

                <Grid item xs={12}>
                    <ArcTextField id={componentName} label="Project details*" name="description" handlechange={e => props.handlechange(e)}  multiline rows={5} {...props}
                        error={props.errorfields.indexOf("description") > -1}/>
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
    const errorfields = props.validateMandatoryFields('description');
    const errormessages = [];

    if (errorfields.length > 0) {
        errormessages.push("Mandatory fields missing");
    }

    // Series of business validations
    if (props[componentName].description && props[componentName].description.length > 0 && props[componentName].description.length <= 50) {
        errorfields.push('description');
        errormessages.push('Description should be greater than 50 characters long');
    }

    props.reportErrors(errorfields, errormessages);

    return errorfields;
}


Purposeofvisit.protoTypes = {
    purposeofvisit: PropTypes.object
}

export default withWizard(Purposeofvisit, componentName)
