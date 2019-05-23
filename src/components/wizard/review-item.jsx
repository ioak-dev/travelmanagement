import React from 'react';
import {Grid, Typography, Hidden} from '@material-ui/core';
import PropTypes from 'prop-types';

function ReviewItem(props) {
    return (
        
        <Grid xs={12} container item direction="row">
            <Hidden smDown>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    <Typography variant="body1">{props.name}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body2" style={{'wordWrap': 'break-word'}}>{props.value}</Typography>
                </Grid>
                <Grid item xs={2}></Grid>
            </Hidden>
            <Hidden smUp>
                <Grid item xs={5}>
                    <Typography variant="body1">{props.name}</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="body2" style={{'wordWrap': 'break-word'}}>{props.value}</Typography>
                </Grid>
            </Hidden>
        </Grid>
    )
}

ReviewItem.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string
}

export default ReviewItem;
