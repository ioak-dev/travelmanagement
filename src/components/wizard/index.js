import React from 'react'
import Traveltype from './traveltype.jsx';
import Clientinfo from './clientinfo.jsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWizard, goToPage } from '../../actions/wizardActions';
import Purposeofvisit from "./purposeofvisit.jsx";
import Flightdetails from "./flightdetails.jsx";
import Visa from "./visa.jsx"
import Hoteldetails from "./hoteldetails.jsx"
import Localtransportdetails from "./localtransportdetails.jsx"
import Review from "./review.jsx"
import { Grid, Hidden } from '@material-ui/core';

import { SECTION_FIRST, SECTION_02, SECTION_03, SECTION_04, SECTION_05, SECTION_06, SECTION_07, 
    SECTION_REVIEW, SECTION_OUTCOME_SUBMIT, SECTION_OUTCOME_SAVE, SECTION_OUTCOME_APPROVE, 
    SECTION_OUTCOME_REJECT, SECTION_OUTCOME_COMPLETE } from '../wizard/section-types';
import OutcomeSubmit from './outcome-submit.jsx';
import OutcomeSave from './outcome-save.jsx';
import OutcomeApprove from './outcome-approve.jsx';
import OutcomeReject from './outcome-reject.jsx';
import OutcomeComplete from './outcome-complete.jsx';

class Wizard extends React.Component {

    componentDidMount() {
        this.props.fetchWizard();

        if (!this.props.id) {
            this.props.goToPage(SECTION_FIRST);
        }
    }

    render() {
        const wizardPages =
            <div>
                {this.props.currentpage === SECTION_FIRST && <Traveltype loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_02 && <Clientinfo loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_03 && <Purposeofvisit loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_04 && <Flightdetails loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_05 && <Visa loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_06 && <Hoteldetails loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_07 && <Localtransportdetails loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_REVIEW && <Review loggedInUserId={this.props.loggedUser.id} />}
                {this.props.currentpage === SECTION_OUTCOME_SUBMIT && <OutcomeSubmit />}
                {this.props.currentpage === SECTION_OUTCOME_SAVE && <OutcomeSave />}
                {this.props.currentpage === SECTION_OUTCOME_APPROVE && <OutcomeApprove />}
                {this.props.currentpage === SECTION_OUTCOME_REJECT && <OutcomeReject />}
                {this.props.currentpage === SECTION_OUTCOME_COMPLETE && <OutcomeComplete />}
            </div>;

        return (
            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Hidden smUp>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        {wizardPages}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        {wizardPages}
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Hidden>
            </Grid>
        );
    }
}

Wizard.protoTypes = {
    id: PropTypes.string,
    fetchWizard: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
    currentpage: PropTypes.number,
    status: PropTypes.string,
}

const mapStateToProps = state => ({
    currentpage:  state.wizard.currentpage,
    loggedUser: state.user.loggedUser
})

export default connect( mapStateToProps, { fetchWizard, goToPage } )(Wizard)
