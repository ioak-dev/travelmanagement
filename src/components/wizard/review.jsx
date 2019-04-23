import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import { Grid, Typography } from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';
import ReviewItem from './review-item';

const componentName = "review";

const Review = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <WizardFlow modify={props.firstPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} submit={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Client Information</Typography>
                </Grid>
                <ReviewItem name="Name" value={props.clientinfo.name}/>
                <ReviewItem name="Address1" value={props.clientinfo.address1}/>
                <ReviewItem name="Address2" value={props.clientinfo.address2}/>
            </Grid>

            <br />

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Flight Details</Typography>
                </Grid>
                <ReviewItem name="Onward journey" value="Bangalore"/>
            </Grid>

            <br />

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Purpose of visit</Typography>
                </Grid>
                <ReviewItem name="Project Description" value={props.purposeofvisit.description}/>
            </Grid>
        </form>
    </div>

function nextPage(props) {
    console.log(props);
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

Review.protoTypes = {
    clientinfo: PropTypes.object,
    purposeofvisit: PropTypes.object
}

export default withWizard(Review, componentName)
