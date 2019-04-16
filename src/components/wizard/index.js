import React from 'react'
import Traveltype from './traveltype.jsx';
import Clientinfo from './clientinfo.jsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWizard } from '../../actions/wizardActions';
import Purposeofvisit from "./purposeofvisit.jsx";
import Flightdetails from "./flightdetails.jsx";
import Hoteldetails from "./hoteldetails.jsx"
import Localtransportdetails from "./localtransportdetails.jsx"
import { Grid, Hidden } from '@material-ui/core';

class Wizard extends React.Component {
    
    componentWillMount() {
        this.props.fetchWizard(this.props.id);
    }

    render() {
        const wizardPages = 
            <div>
                {this.props.currentpage === 1 && <Traveltype />}
                {this.props.currentpage === 2 && <Clientinfo />}
                {this.props.currentpage === 3 && <Purposeofvisit />}
                {this.props.currentpage === 4 && <Flightdetails />}
                {this.props.currentpage === 5 && <Hoteldetails />}
                {this.props.currentpage === 6 && <Localtransportdetails />}
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
    id: PropTypes.string.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    currentpage: PropTypes.number
}

const mapStateToProps = state => ({
    currentpage:  state.wizard.currentpage
})

export default connect( mapStateToProps, { fetchWizard } )(Wizard)
