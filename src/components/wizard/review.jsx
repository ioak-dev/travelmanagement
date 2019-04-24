import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import { Grid, Typography } from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';
import ReviewItem from './review-item';
import moment from 'moment';
import ArcTextField from '../ui/elements/arc-text-field';

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
                    <Typography variant="h6">Travel Type</Typography>
                </Grid>
                <ReviewItem name="Request Type" value={props.traveltype.type}/>
            </Grid>

            <br />

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Client Information</Typography>
                </Grid>
                <ReviewItem name="Customer Name" value={props.clientinfo.name}/>
                <ReviewItem name="City" value={props.clientinfo.city}/>
                <ReviewItem name="Country" value={props.clientinfo.country}/>
            </Grid>

            <br />


            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Purpose of visit</Typography>
                </Grid>
                <ReviewItem name="Project Description" value={props.purposeofvisit.description}/>
            </Grid>

            <br />

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Flight Details</Typography>
                </Grid>
                <ReviewItem name="Sector1" value={props.flightdetails.sector1}/>
                <ReviewItem name="Sector2" value={props.flightdetails.sector2}/>
                <ReviewItem name="Travel Date" value={moment(props.flightdetails.fromdate).toLocaleString()}/>
                <ReviewItem name="Return Date" value={moment(props.flightdetails.todate).toLocaleString()}/>
                <ReviewItem name="Billability" value={props.flightdetails.billability}/>
            </Grid>

            <br />

            {props.traveltype.type === 'international' &&
                <div>
                    <Grid item xs={12} container direction="column">
                        <Grid xs={12} container direction="row">
                            <Typography variant="h6">Visa Requirements</Typography>
                        </Grid>
                        <ReviewItem name="Visa Required" value={props.visa.required}/>
                        {props.visa.required === 'yes' &&
                            <ReviewItem name="Visa Details" value={props.visa.remark}/>
                        }
                    </Grid>
                    <br />
                </div>
            }

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Hotel and Accommodation</Typography>
                </Grid>
                <ReviewItem name="Hotel Name" value={props.hoteldetails.name}/>
                <ReviewItem name="Address" value={props.hoteldetails.address}/>
                <ReviewItem name="Check-in Time" value={moment(props.hoteldetails.fromdate).toLocaleString()}/>
                <ReviewItem name="Check-out Time" value={moment(props.hoteldetails.todate).toLocaleString()}/>
                <ReviewItem name="Cost of stay" value={props.flightdetails.staycost}/>
                <ReviewItem name="Billability" value={props.flightdetails.billability}/>
            </Grid>

            <br />

            <Grid item xs={12} container direction="column">
                <Grid xs={12} container direction="row">
                    <Typography variant="h6">Local Transportation</Typography>
                </Grid>
                <ReviewItem name="Sector1" value={props.localtransportdetails.sector1}/>
                <ReviewItem name="Sector2" value={props.localtransportdetails.sector2}/>
                <ReviewItem name="Onward Date" value={moment(props.localtransportdetails.fromdate).toLocaleString()}/>
                <ReviewItem name="Return Date" value={moment(props.localtransportdetails.todate).toLocaleString()}/>
                <ReviewItem name="Billability" value={props.flightdetails.billability}/>
            </Grid>

            <br />

            <Grid item xs={12}>
                <ArcTextField id={componentName} label="Remarks" name="remarks1" handlechange={e => props.handlechange(e)}   {...props}
                            multiline rows="5" error={props.errorfields.indexOf("remarks1") > -1}/>
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
    traveltype: PropTypes.object,
    clientinfo: PropTypes.object,
    purposeofvisit: PropTypes.object,
    flightdetails: PropTypes.object,
    hoteldetails: PropTypes.object,
    localtransportdetails: PropTypes.object,
    review: PropTypes.object
}

export default withWizard(Review, componentName)
