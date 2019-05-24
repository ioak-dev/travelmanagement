import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import {FormControlLabel, Grid, Radio, RadioGroup, Typography} from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';
import ArcDatetimeField from "../ui/elements/arc-datetime-field";

const componentName = "traveltype";

const Traveltype = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Grid item xs={12}>
                    <WizardFlow nextpage={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

                <br />
            </Grid>

            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>           

                <Grid item xs={12}>
                    <Typography variant="h6">What type of travel request would you like to create?</Typography>
                </Grid>

                <Grid item xs={12}>
                    <RadioGroup
                        aria-label="Travel type"
                        name="type"
                        value={props[componentName].type}
                        onChange={props.handlechange}
                        row
                    >
                        <FormControlLabel value="Domestic" control={<Radio />} label="Domestic" />
                        <FormControlLabel value="International" control={<Radio />} label="International" />
                    </RadioGroup>
                </Grid>
                {props[componentName].type && <Grid  justify="center">
                    <Grid item xs={12} >
                    <Typography variant="h6">Is your Travel Billable?</Typography>
                    </Grid>
                    <Grid item xs={12} >
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
                </Grid>}

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
    const errorfields = props.validateMandatoryFields('type','billability');
    const errormessages = [];

    if (errorfields.length > 0) {
        errormessages.push("Mandatory fields missing");
    }

    props.reportErrors(errorfields, errormessages);

    return errorfields;
}



Traveltype.protoTypes = {
    traveltype: PropTypes.object
}

export default withWizard(Traveltype, componentName)
