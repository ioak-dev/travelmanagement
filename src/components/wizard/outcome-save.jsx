import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Hidden } from '@material-ui/core';
import withWizard from './with-wizard';


const OutcomeSave = (props) =>
    <div className="arc-root">
            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>

                <br />
                <i className="material-icons" style={{'transform': 'scale(4)'}}>file_copy</i>
                <br /><br />
                
                <Hidden smDown><Typography variant="h2">{props.wizardid}</Typography></Hidden>
                <Hidden smUp><Typography variant="h4">{props.wizardid}</Typography></Hidden>
                <Typography variant="body1">Your application has been saved in DRAFT state and can be found in View Requests page</Typography>
                <Typography variant="body1">We have saved your data and can be retrieved from where you have left</Typography>

                <br /><br />
                <Typography variant="h6" color="secondary">Application saved for later</Typography>
            </Grid>
    </div>


OutcomeSave.protoTypes = {
    wizardid: PropTypes.string
}

export default withWizard(OutcomeSave)
