import React from 'react';
import {Grid, Hidden, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@material-ui/core';
import PropTypes from 'prop-types';
import ArcButton from '../ui/elements/arc-button';
import ArcButtonDecision from '../ui/elements/arc-button-decision';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class WizardFlow extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {dialogOpen: false};
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.proceed = this.proceed.bind(this);
    }

    openDialog(action, dialogHead, dialogText) {
        this.setState({
            dialogOpen: true,
            dialogHead: dialogHead,
            dialogText: dialogText,
            action: action
        })
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        })
    }

    proceed() {
        switch(this.state.action) {
            case 'submit':
                this.props.submit();
                this.closeDialog();
                break;
            case 'approve':
                this.props.approve();
                this.closeDialog();
                break;
            case 'reject':
                this.props.reject();
                this.closeDialog();
                break;
            case 'complete':
                this.props.complete();
                this.closeDialog();
                break;
        }
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
                        {this.props.approve && <ArcButtonDecision variant="contained" backward onClick={() => this.openDialog('reject', 'Application Rejection', 'Are you sure, you want to reject this application?')}>
                            <i className="material-icons">close</i>Reject
                        </ArcButtonDecision>}                   
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
                        {this.props.submit && <ArcButton variant="contained" color="primary" onClick={() => this.openDialog('submit', 'Application Submission', 'Are you sure, you want to send this application for review? Once submitted for review, you cannot edit further. You can track the status of your application in your submitted applications list')}>
                            <i className="material-icons">check</i>Submit
                        </ArcButton>}
                        {this.props.reject && <ArcButtonDecision variant="contained" forward onClick={() => this.openDialog('approve', 'Application Approval', 'Are you sure, you want to approve this application?')}>
                            <i className="material-icons">check</i>Approve
                        </ArcButtonDecision>}
                        {this.props.complete && <ArcButton variant="contained" color="primary" onClick={() => this.openDialog('complete', 'Process Completion', 'Are you sure, you want to mark the application as complete?')}>
                            <i className="material-icons">check</i>Mark as Complete
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
                    <DialogTitle id="form-dialog-title">{this.state.dialogHead}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.dialogText}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ArcButton onClick={this.closeDialog} variant="outlined" color="primary">No</ArcButton>
                        <ArcButton onClick={this.proceed} variant="contained" color="primary">Yes</ArcButton>
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
    saveforlater: PropTypes.func,
    approve: PropTypes.func,
    reject: PropTypes.func,
    complete: PropTypes.func
};

export default WizardFlow;
