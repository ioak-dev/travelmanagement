import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./errormessage";
import ArcTextField from '../ui/elements/arc-text-field';
import {FormControlLabel, Grid, Radio, RadioGroup, Typography} from '@material-ui/core';
import WizardFlow from './wizard-flow';
import withWizard from './with-wizard';

const componentName = "visa";

const Visa = (props) =>
    <div className="arc-root">
        <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Grid item xs={12}>
                    <WizardFlow headline="Visa Requirements"
                        previouspage={previousPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} nextpage={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

                <br />
            </Grid>

            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>           

                <Grid item xs={12}>
                    <Typography variant="body1">Do you have any visa requirements and would you like us to assist with visa application?</Typography>
                </Grid>

                <Grid item xs={12}>
                    <RadioGroup
                        aria-label="Visa requirement"
                        name="required"
                        value={props[componentName].required}
                        onChange={props.handlechange}
                        row
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </Grid>
            </Grid>

            {props.visa.required === 'yes' &&
                <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                    <Grid item xs={12}>
                        <ArcTextField id={componentName} label="Visa requirement*" name="remark" handlechange={e => props.handlechange(e)} multiline rows={5}  {...props}
                                    error={props.errorfields.indexOf("remark") > -1}/>
                    </Grid>
                </Grid>
            }


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
    const errorfields = props.validateMandatoryFields('required');
    const errormessages = [];

    if (errorfields.length > 0) {
        errormessages.push("Mandatory fields missing");
    }

    props.reportErrors(errorfields, errormessages);

    return errorfields;
}



Visa.protoTypes = {
    visa: PropTypes.object
}

export default withWizard(Visa, componentName)
