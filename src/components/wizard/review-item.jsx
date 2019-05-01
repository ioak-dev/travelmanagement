import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

function ReviewItem(props) {
    return (
        <Grid xs={12} container item direction="row">
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
                <Typography variant="body1">{props.name}</Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="body2">{props.value}</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}

ReviewItem.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string
}

export default ReviewItem;
