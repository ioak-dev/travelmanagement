import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import {FormControlLabel, Grid, Radio, RadioGroup, Typography} from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';
import ArcDatetimeField from "../ui/elements/arc-datetime-field";
import moment from 'moment';

const componentName = "hoteldetails";

const HotelDetails = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Grid item xs={12}>
                    <WizardFlow headline="Accommodation Details"
                        previouspage={previousPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} nextpage={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

                <br />

                <Grid item xs={12}>
                    <ArcTextField id={componentName} label="Hotel name*" name="name" handlechange={e => props.handlechange(e)}   {...props}
                                  error={props.errorfields.indexOf("name") > -1}/>
                </Grid>
                <Grid item xs={12}>
                    <ArcTextField id={componentName} label="Hotel Address*" name="address" handlechange={e => props.handlechange(e)} multiline rows={3}  {...props}
                                  error={props.errorfields.indexOf("name") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <ArcDatetimeField id={componentName} label="From date*" name="fromdate" {...props} handlechange={e => props.handledatechange(e, "fromdate")}
                                      ampm={true} disablePast error={props.errorfields.indexOf("fromdate") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <ArcDatetimeField id={componentName} label="To date*" name="todate" {...props} handlechange={e => props.handledatechange(e, "todate")}
                                      ampm={true} disablePast error={props.errorfields.indexOf("todate") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <RadioGroup
                        aria-label="Billability"
                        name="billability"
                        value={props[componentName].billability}
                        onChange={props.handlechange}
                        row
                    >
                        <FormControlLabel value="billable" control={<Radio />} label="Billable" />
                        <FormControlLabel value="non-billable" control={<Radio />} label="Non billable" />
                    </RadioGroup>
                </Grid>

                <Grid item xs={6}>
                    <ArcTextField id={componentName} label="Total Stay Cost*" name="staycost" handlechange={e => props.handlechange(e)}  {...props}
                                  error={props.errorfields.indexOf("name") > -1}/>
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
    const errorfields = props.validateMandatoryFields('name','address','staycost','billability');
    const errormessages = [];

    if (errorfields.length > 0) {
        errormessages.push("Mandatory fields missing");
    }

    // Series of business validations
    if(moment(props.hoteldetails.fromdate).toDate() <= moment().toDate()) {
        errormessages.push('Onward journey cannot be in the past');
        errorfields.push('fromdate');
    }
    if(moment(props.hoteldetails.todate).toDate() <= moment().toDate()) {
        errormessages.push('Return journey cannot be in the past');
        errorfields.push('todate');
    }
    if(moment(props.hoteldetails.todate).toDate() < moment(props.hoteldetails.fromdate).toDate()) {
        errormessages.push('Return journey cannot be before onward journey');
        errorfields.push('todate');
    }

    props.reportErrors(errorfields, errormessages);

    return errorfields;
}



HotelDetails.protoTypes = {
    hoteldetails: PropTypes.object
}

export default withWizard(HotelDetails, componentName)
