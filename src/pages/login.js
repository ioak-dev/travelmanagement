import React from 'react'
import { Grid, Button, Typography, Fab } from '@material-ui/core';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {loggedInUserEmail: null};

        this.logout.bind(this);
    }

    componentDidMount() {
        this.initialize();
    }

    initialize() {
        if (sessionStorage.getItem('userSigninName')) {
            this.setState({loggedInUserEmail: sessionStorage.getItem('userSigninName')});
        } else {
            this.setState({loggedInUserEmail: null});
        }
    }

    render() {
        if (!this.state.loggedInUserEmail) {
            return (
                <div className="arc-root">
                    <Grid container direction="column" justify="center" alignItems="center"  spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" inline>You are not logged in</Typography>
                        </Grid>
                        <Grid item xs={12}>
                                <a href="/login" id="connect-button">Sign in using Exchange 365</a>
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
                            <Typography variant="subtitle1" color="primary" inline>{this.state.loggedInUserEmail}</Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Fab variant="extended" color="secondary" onClick={() => {this.logout()}}>
                                <i className="material-icons">power_settings_new</i> &nbsp;Logout
                            </Fab>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        this.initialize();
    }
}
export default Login;