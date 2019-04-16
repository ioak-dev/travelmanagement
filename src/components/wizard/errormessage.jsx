import React from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container direction="row" justify="center" spacing={8}>
        <Grid container item justify="flex-end" xs={12}>
          <Typography variant="caption">
            {this.props.errors.map(item=><div key={item}>* {item}</div>)}
          </Typography>
        </Grid>
      </Grid>
    );
  }
  
}

ErrorMessage.protoTypes = {
  errors: PropTypes.array.isRequired
}

export default ErrorMessage