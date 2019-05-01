import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Hidden } from '@material-ui/core';
import withWizard from './with-wizard';


const OutcomeSubmit = (props) =>
    <div className="arc-root">
            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>

                <br />
                
                <Hidden smDown><Typography variant="h2">{props.wizardid}</Typography></Hidden>
                <Hidden smUp><Typography variant="h4">{props.wizardid}</Typography></Hidden>
                <Typography variant="body1">You can track the application status in View Requests page</Typography>

                <br /><br /><br /><br />
                <Hidden smDown><Typography variant="h2">GSTIN78498989</Typography></Hidden>
                <Hidden smUp><Typography variant="h4">GSTIN78498989</Typography></Hidden>
                <Typography variant="body1">IMPORTANT! While doing hotel check-in, don't forget to share GST number of the company</Typography>


                <br /><br />
                <Typography variant="h6" color="secondary">Application submitted for review</Typography>
            </Grid>
    </div>


OutcomeSubmit.protoTypes = {
    wizardid: PropTypes.string
}

export default withWizard(OutcomeSubmit)
