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
                    <WizardFlow headline="What type of travel request do you want to create?"
                                previouspage={previousPage.bind(this, props)} saveforlater={props.saveForLater.bind(this)} nextpage={nextPage.bind(this, props)} />
                </Grid>

                <ErrorMessage errors={props.errormessages} />

                <br />



                <Grid item xs={6}>
                    <RadioGroup
                        aria-label="Travel type"
                        name="type"
                        value={props[componentName].type}
                        onChange={props.handlechange}
                        row
                    >
                        <FormControlLabel value="domestic" control={<Radio />} label="Domestic" />
                        <FormControlLabel value="international" control={<Radio />} label="International" />
                    </RadioGroup>
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
    const errorfields = props.validateMandatoryFields('type');
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
