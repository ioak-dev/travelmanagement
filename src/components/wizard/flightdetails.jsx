import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    goToPreviousPage,
    goToNextPage,
    fetchWizard,
    updateFlightdetails
} from '../../actions/wizardActions';
import ErrorMessage from "./errormessage";
import { Grid, FormControlLabel, Radio, RadioGroup, FormLabel } from '@material-ui/core';
import WizardFlow from './wizard-flow';
import ArcTextField from '../ui/elements/arc-text-field';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import ArcDatetimeField from '../ui/elements/arc-datetime-field';

const componentName = "flightdetails";

class Flightdetails extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        this.setState({
            errors: [],
            flightdetails: this.props.flightdetails
        }
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.flightdetails) {
            this.setState(
                {
                    flightdetails: nextProps.flightdetails
                },
                () => {console.log(this.state)}
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            errorfields: [],
            errormessages: []
        };

        this.previousPageAction = this.previousPageAction.bind(this);
        this.nextpage = this.nextpage.bind(this);
        this.saveforlater = this.saveforlater.bind(this)
        this.handlechange = this.handlechange.bind(this);
    }

    render() {
        return (

            <div className="arc-root">

                <form noValidate autoComplete="off">
                    <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                            <WizardFlow headline="Flight Details" previouspage={this.previousPageAction.bind(this)} saveforlater={this.saveforlater.bind(this)} nextpage={this.nextpage.bind(this)}></WizardFlow>
                            </Grid>
                        </Grid>
                        <ErrorMessage errors={this.state.errormessages} />

                        <Grid item xs={12}>
                            <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="Sector 1*" name="sector1" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("sector1") > -1} />
                                </Grid>
                                <Grid item xs={6}>
                                    <ArcTextField id={componentName} label="Sector 2*" name="sector2" handlechange={this.handlechange.bind(this)} {...this.state}
                                        error={this.state.errorfields.indexOf("sector2") > -1}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <div className="picker">
                                            <ArcDatetimeField id={componentName} label="From date*" name="fromdate" handlechange={this.handledatechange.bind(this)} {...this.state}
                                                ampm={true} disablePast error={this.state.errorfields.indexOf("fromdate") > -1}/>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <div className="picker">
                                            <ArcDatetimeField id={componentName} label="To date*" name="todate" handlechange={this.handledatechange.bind(this)} {...this.state}
                                                ampm={true} disablePast error={this.state.errorfields.indexOf("todate") > -1}/>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <RadioGroup
                                            aria-label="Billability"
                                            name="billability"
                                            value={this.state.flightdetails.billability}
                                            onChange={this.handlechange}
                                            row
                                        >
                                            <FormControlLabel value="billable" control={<Radio />} label="Billable" />
                                            <FormControlLabel value="non-billable" control={<Radio />} label="Non billable" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={6}></Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }

    previousPageAction(e) {
        e.preventDefault();
        this.props.updateFlightdetails(this.props.id, this.state);
        this.props.goToPreviousPage(this.props.currentpage, 1);
    }

    handledatechange(event, fieldname) {
        this.setState(
            {
                flightdetails: {
                    ...this.state.flightdetails,
                    [fieldname]: moment(event).toDate()
                }
            }
        );
    }

    handlechange(event) {
        this.setState(
            {
                flightdetails: {
                    ...this.state.flightdetails,
                    [event.currentTarget.name]: event.currentTarget.value
                }
            }
        );
    }

    saveforlater(e) {
        e.preventDefault();
        // call action to save
        // redirect to last page
    }

    nextpage(e) {
        e.preventDefault();
        const errorfields = this.validate();

        this.setState({
            errorfields: errorfields
        });

        // On success only
        if (errorfields.length === 0) {
            this.nextPageAction();
        }
    }

    nextPageAction() {
        this.props.updateFlightdetails(this.props.id, this.state);
        this.props.goToNextPage(this.props.currentpage, 1);
    }

    validateMandatoryFields(...fields) {
        let errorfields = [];
        fields.map(field => {
            if (!this.state[componentName][field] || this.state[componentName][field] === '') {
                errorfields.push(field);
            }
        })
        return errorfields;
    }


    validate() {

        const errorfields = this.validateMandatoryFields('sector1', 'sector2', 'fromdate', 'todate', 'billability');
        const errormessages = [];

        if (errorfields.length > 0) {
            errormessages.push("Mandatory fields missing");
        }

        // Series of business validations
        if(moment(this.state.flightdetails.fromdate).toDate() <= moment().toDate()) {
            errormessages.push('Onward journey cannot be in the past');
            errorfields.push('fromdate');
        }
        if(moment(this.state.flightdetails.todate).toDate() <= moment().toDate()) {
            errormessages.push('Return journey cannot be in the past');
            errorfields.push('todate');
        }
        if(moment(this.state.flightdetails.todate).toDate() < moment(this.state.flightdetails.fromdate).toDate()) {
            errormessages.push('Return journey cannot be before onward journey');
            errorfields.push('todate');
        }

        this.setState({
            errormessages: errormessages
        });

        return errorfields;
    }
}

Flightdetails.protoTypes = {
    id: PropTypes.string.isRequired,
    currentpage: PropTypes.number.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    goToPreviousPage: PropTypes.func.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    flightdetails: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    flightdetails:  state.wizard.flightdetails
})

export default connect(mapStateToProps, { goToPreviousPage, goToNextPage, fetchWizard, updateFlightdetails })(Flightdetails)
