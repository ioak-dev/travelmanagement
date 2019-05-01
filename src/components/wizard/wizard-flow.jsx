import React from 'react';
import {Grid, Hidden, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@material-ui/core';
import PropTypes from 'prop-types';
import ArcButton from '../ui/elements/arc-button';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class WizardFlow extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {dialogOpen: false};
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        })
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        })
    }

    render() {
        return (
            <div>
                <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                    <Grid item xs={6}>
                        {this.props.previouspage && <ArcButton variant="contained" color="default" onClick={this.props.previouspage}>
                            <i className="material-icons">skip_previous</i>Previous
                        </ArcButton>}
                        {this.props.modify && <ArcButton lighttext variant="contained" color="secondary" onClick={this.props.modify}>
                            <i className="material-icons">edit</i>Edit
                        </ArcButton>}
                    </Grid>
                    <Grid container item xs={6} justify="flex-end">                    
                            {this.props.saveforlater && <Hidden smDown><ArcButton variant="text" color="default" onClick={this.props.saveforlater}>
                                <i className="material-icons">save_alt</i>Save for later
                            </ArcButton></Hidden>}
                        &nbsp;&nbsp;
                        {this.props.nextpage && <ArcButton lighttext variant="contained" color="primary" onClick={this.props.nextpage}>
                            <i className="material-icons">skip_next</i>Next
                        </ArcButton>}
                        {this.props.review && <ArcButton lighttext variant="contained" color="primary" onClick={this.props.review}>
                            <i className="material-icons">assignment</i>Review
                        </ArcButton>}
                        {this.props.submit && <ArcButton variant="contained" color="primary" onClick={this.openDialog}>
                            <i className="material-icons">check</i>Submit
                        </ArcButton>}
                    </Grid>
                </Grid>
                <br />
                <Grid container item xs={12} justify="center">
                    <Typography variant="h5">{this.props.headline}</Typography>
                </Grid>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.closeDialog}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to submit?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ArcButton onClick={this.closeDialog} variant="text" color="primary">
                            No
                        </ArcButton>
                        <ArcButton onClick={this.props.submit} variant="text" color="primary">
                            Yes
                        </ArcButton>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

WizardFlow.propTypes = {
    previouspage: PropTypes.func,
    nextpage: PropTypes.func,
    submit: PropTypes.func,
    saveforlater: PropTypes.func
};

export default WizardFlow;
