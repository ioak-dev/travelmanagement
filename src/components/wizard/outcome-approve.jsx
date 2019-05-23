import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Hidden } from '@material-ui/core';
import withWizard from './with-wizard';


const OutcomeApprove = (props) =>
    <div className="arc-root">
            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>

                <br />
                <i className="material-icons" style={{'transform': 'scale(4)', 'color':'#4E8E57'}}>thumb_up</i>
                <br /><br />
                <Hidden smDown><Typography variant="h2">{props.wizardid}</Typography></Hidden>
                <Hidden smUp><Typography variant="h4">{props.wizardid}</Typography></Hidden>
                <Typography variant="body1">Application has been approved and an email notification has been sent to the applicant</Typography>

                <br /><br />
                <Typography variant="h6" color="secondary">Application approved</Typography>
            </Grid>
    </div>


OutcomeApprove.protoTypes = {
    wizardid: PropTypes.string
}

export default withWizard(OutcomeApprove)
