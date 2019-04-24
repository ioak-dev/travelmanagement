import React from 'react'
import { Grid, Button, Typography, Fab } from '@material-ui/core';
import ArcButton from '../components/ui/elements/arc-button';

import { connect } from 'react-redux';
import { fetchLoggedUser, reloadLoggedUser } from '../actions/userActions';

class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.logout.bind(this);
    }

    componentDidMount() {
    }

    render() {
        if (!this.props.loggedUser.loggedin) {
            return (
                <div className="arc-root">
                    <Grid container direction="column" justify="center" alignItems="center"  spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" inline>You are not logged in</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ArcButton href="/login" id="connect-button" variant="contained" color="primary" >Sign in using Exchange 365</ArcButton>
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div className="arc-root">
                    <Grid container direction="column" justify="center" alignItems="center" spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" inline>You are logged in as </Typography>
                            <Typography variant="subtitle1" color="primary" inline>{this.props.loggedUser.displayname}</Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <ArcButton variant="contained" color="primary" onClick={() => {this.logout()}}>
                                <i className="material-icons">power_settings_new</i>Sign out
                            </ArcButton>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        this.props.reloadLoggedUser(null);
    }
}

const mapStateToProps = state => ({
    loggedUser: state.user.loggedUser
})

export default connect(mapStateToProps, {fetchLoggedUser, reloadLoggedUser}) (Login);