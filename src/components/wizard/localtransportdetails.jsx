import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import {FormControlLabel, Grid, Radio, RadioGroup, Typography} from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';
import ArcDatetimeField from "../ui/elements/arc-datetime-field";
import moment from 'moment';

const componentName = "localtransportdetails";

const LocalTransportDetails = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Grid item xs={12}>
                    <WizardFlow headline="Local Transportation"
                                previouspage={previousPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} review={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

                <br />
                <Grid item xs={6}>
                    <ArcTextField id={componentName} label="Onward sector*" name="sector1" handlechange={e => props.handlechange(e)}   {...props}
                                  error={props.errorfields.indexOf("sector1") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <ArcTextField id={componentName} label="Return sector*" name="sector2" handlechange={e => props.handlechange(e)}   {...props}
                                  error={props.errorfields.indexOf("sector2") > -1}/>
                </Grid>

                <Grid item xs={6}>
                    <ArcDatetimeField id={componentName} label="Onward date*" name="dateandtime" {...props} handlechange={e => props.handledatechange(e, "dateandtime")}
                                      ampm={true} disablePast error={props.errorfields.indexOf("dateandtime") > -1}/>
                </Grid>
                <Grid item xs={6}>
                    <ArcDatetimeField id={componentName} label="Return date*" name="dateandtimereturn" {...props} handlechange={e => props.handledatechange(e, "dateandtimereturn")}
                                      ampm={true} disablePast error={props.errorfields.indexOf("dateandtimereturn") > -1}/>
                </Grid>

                <Grid item xs={12}>
                    <ArcTextField id={componentName} label="Remarks on Dining Allowance" name="remarks1" handlechange={e => props.handlechange(e)} multiline rows={3}  {...props}
                                  error={props.errorfields.indexOf("remarks1") > -1}/>
                </Grid>

                <Grid item xs={12}>
                    <ArcTextField id={componentName} label="Remarks on Travel Allowance" name="remarks2" handlechange={e => props.handlechange(e)} multiline rows={3} {...props}
                                  error={props.errorfields.indexOf("remarks2") > -1}/>
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

                <Grid item xs={6}></Grid>


            </Grid>


        </form>
    </div>

function previousPage(props) {
    props.previousPage(1);
}

function nextPage(props) {
    if (validate(props).length === 0) {
        console.log(11);
        props.nextPage(1);
    }
}

function validate(props) {
    const errorfields = props.validateMandatoryFields('sector1','sector2','billability');
    const errormessages = [];

    if (errorfields.length > 0) {
        errormessages.push("Mandatory fields missing");
    }

    // Series of business validations
    if(moment(props.localtransportdetails.dateandtime).toDate() <= moment().toDate()) {
        errormessages.push('Onward journey cannot be in the past');
        errorfields.push('dateandtime');
    }
    if(moment(props.localtransportdetails.dateandtimereturn).toDate() <= moment().toDate()) {
        errormessages.push('Return journey cannot be in the past');
        errorfields.push('dateandtimereturn');
    }
    if(moment(props.localtransportdetails.dateandtime).toDate() < moment(props.hoteldetails.dateandtimereturn).toDate()) {
        errormessages.push('Return journey cannot be before onward journey');
        errorfields.push('dateandtime');
    }

    props.reportErrors(errorfields, errormessages);

    return errorfields;
}



LocalTransportDetails.protoTypes = {
    hoteldetails: PropTypes.object
}

export default withWizard(LocalTransportDetails, componentName)
