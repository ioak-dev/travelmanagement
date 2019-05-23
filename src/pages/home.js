import React from 'react'
import { connect } from 'react-redux';
import { reloadLoggedUser } from '../actions/userActions';
import { Grid, Paper, Typography } from '@material-ui/core';

class Home extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
    // this.props.reloadLoggedUser(sessionStorage.getItem('userSigninName'));
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
         <div>
          <br /><br />
          <Paper elevation={1}>
            <br />
            <Typography variant="h5" component="h3">
              Welcome to Travel Management System
            </Typography>
            <br />
            <Typography component="p">
              Manage your travel application from start to end
            </Typography>
            <br />
          </Paper>
        </div>
      </Grid>
    );
  }

}

const mapStateToProps = state => ({
  loggedUser: state.user.loggedUser
})

export default connect(mapStateToProps, {reloadLoggedUser}) (Home);