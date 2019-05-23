import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Hidden } from '@material-ui/core';
import withWizard from './with-wizard';


const OutcomeComplete = (props) =>
    <div className="arc-root">
            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>

                <br />
                <i className="material-icons" style={{'transform': 'scale(4)', 'color':'#4E8E57'}}>check_circle</i>
                <br /><br />
                <Hidden smDown><Typography variant="h2">{props.wizardid}</Typography></Hidden>
                <Hidden smUp><Typography variant="h4">{props.wizardid}</Typography></Hidden>
                <Typography variant="body1">Application has been marked as complete and the applicant has been notified</Typography>

                <br /><br />
                <Typography variant="h6" color="secondary">Application is complete</Typography>
            </Grid>
    </div>


OutcomeComplete.protoTypes = {
    wizardid: PropTypes.string
}

export default withWizard(OutcomeComplete)
