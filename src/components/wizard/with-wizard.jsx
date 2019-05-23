import React, { Component} from 'react';
import { connect } from 'react-redux';
import { goToPage, goToFirstPage, goToPreviousPage, goToNextPage, fetchWizard, updateWizard, submitWizard, approveWizard, rejectWizard, saveWizard, completeWizard } from '../../actions/wizardActions';
import moment from 'moment';
import { SECTION_OUTCOME_SAVE, SECTION_OUTCOME_SUBMIT, SECTION_OUTCOME_APPROVE, SECTION_OUTCOME_REJECT, SECTION_OUTCOME_COMPLETE } from '../wizard/section-types'

const withWizard = (WrappedComponent, dataref) => {
    class Wrapper extends Component {
        componentDidMount() {
            this.props.fetchWizard();
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps[dataref]) {
                this.setState(
                    {
                        [dataref]: nextProps[dataref]
                    }
                )
            }
        }

        constructor(props) {
            super(props);

            this.state = {
                errorfields: [],
                errormessages: [],
                [dataref]: this.props[dataref]
            };

            this.handlechange = this.handlechange.bind(this);
            this.handledatechange = this.handledatechange.bind(this);
            this.submit = this.submit.bind(this);
        }


        handledatechange(event, fieldname) {
            this.setState(
                {
                    [dataref]: {
                        ...this.state[dataref],
                        [fieldname]: moment(event).toDate()
                    }
                }
            );
        }


        handlechange(event) {
            this.setState(
                {
                    [dataref]: {
                        ...this.state[dataref],
                        [event.currentTarget.name]: event.currentTarget.value
                    }
                }
            )
        }

        getReducerType() {
            return 'UPDATE_' + dataref.toUpperCase();
        }

        reportErrors(errorfields, errormessages) {
            this.setState({
                errorfields: errorfields,
                errormessages: errormessages
            })
        }

        nextPage(count) {
            this.props.updateWizard(this.getReducerType(), "1", this.state);
            this.props.goToNextPage(this.props.currentpage, count);
        }

        firstPage() {
            this.props.goToFirstPage();
        }

        previousPage(count) {
            this.props.updateWizard(this.getReducerType(), "1", this.state);
            this.props.goToPreviousPage(this.props.currentpage, count);
        }

        submit(userId) {
            this.props.submitWizard(userId, {
                id: this.props.wizardid,
                createdBy: this.props.createdBy,
                traveltype: this.props.traveltype,
                clientinfo: this.props.clientinfo,
                purposeofvisit: this.props.purposeofvisit,
                flightdetails: this.props.flightdetails,
                hoteldetails: this.props.hoteldetails,
                localtransportdetails: this.props.localtransportdetails,
                visa: this.props.visa,
                review: this.state.review,
                status: this.props.status.name
            });
            this.props.goToPage(SECTION_OUTCOME_SUBMIT);
        }

        approve(userId) {
            this.props.approveWizard(userId, {
                id: this.props.wizardid,
                createdBy: this.props.createdBy,
                traveltype: this.props.traveltype,
                clientinfo: this.props.clientinfo,
                purposeofvisit: this.props.purposeofvisit,
                flightdetails: this.props.flightdetails,
                hoteldetails: this.props.hoteldetails,
                localtransportdetails: this.props.localtransportdetails,
                visa: this.props.visa,
                review: this.state.review,
                status: this.props.status.name
            });
            this.props.goToPage(SECTION_OUTCOME_APPROVE);
        }

        reject(userId) {
            this.props.rejectWizard(userId, {
                id: this.props.wizardid,
                createdBy: this.props.createdBy,
                traveltype: this.props.traveltype,
                clientinfo: this.props.clientinfo,
                purposeofvisit: this.props.purposeofvisit,
                flightdetails: this.props.flightdetails,
                hoteldetails: this.props.hoteldetails,
                localtransportdetails: this.props.localtransportdetails,
                visa: this.props.visa,
                review: this.state.review,
                status: this.props.status.name
            });
            this.props.goToPage(SECTION_OUTCOME_REJECT);
        }

        complete(userId) {
            this.props.completeWizard(userId, {
                id: this.props.wizardid,
                createdBy: this.props.createdBy,
                traveltype: this.props.traveltype,
                clientinfo: this.props.clientinfo,
                purposeofvisit: this.props.purposeofvisit,
                flightdetails: this.props.flightdetails,
                hoteldetails: this.props.hoteldetails,
                localtransportdetails: this.props.localtransportdetails,
                visa: this.props.visa,
                review: this.state.review,
                status: this.props.status.name
            });
            this.props.goToPage(SECTION_OUTCOME_COMPLETE);
        }

        saveForLater() {
            this.props.saveWizard(this.props.loggedInUserId, {
                id: this.props.wizardid,
                createdBy: this.props.createdBy,
                traveltype: this.props.traveltype,
                clientinfo: this.props.clientinfo,
                purposeofvisit: this.props.purposeofvisit,
                flightdetails: this.props.flightdetails,
                hoteldetails: this.props.hoteldetails,
                localtransportdetails: this.props.localtransportdetails,
                visa: this.props.visa,
                review: this.state.review,
                status: this.props.status.name
            });
            this.props.goToPage(SECTION_OUTCOME_SAVE);
        }

        validateMandatoryFields(...fields) {
            let errorfields = [];
            fields.map(field => {
                if (!this.state[dataref][field] || this.state[dataref][field] === '') {
                    errorfields.push(field);
                }
            })
            return errorfields;
        }


        render() {
            return (
                <WrappedComponent
                    reportErrors={this.reportErrors.bind(this)}
                    handlechange={this.handlechange.bind(this)}
                    handledatechange={this.handledatechange.bind(this)}
                    firstPage={this.firstPage.bind(this)}
                    nextPage={this.nextPage.bind(this)}
                    previousPage={this.previousPage.bind(this)}
                    saveForLater={this.saveForLater.bind(this)}
                    submit={this.submit.bind(this)}
                    approve={this.approve.bind(this)}
                    reject={this.reject.bind(this)}
                    complete={this.complete.bind(this)}
                    validateMandatoryFields={this.validateMandatoryFields.bind(this)}
                    {...this.props} {...this.state} />
            );
        }
    }

    const mapStateToProps = state => ({
        wizardid: state.wizard.wizardid,
        currentpage: state.wizard.currentpage,
        traveltype:  state.wizard.traveltype,
        clientinfo:  state.wizard.clientinfo,
        purposeofvisit:  state.wizard.purposeofvisit,
        flightdetails:  state.wizard.flightdetails,
        visa: state.wizard.visa,
        hoteldetails: state.wizard.hoteldetails,
        localtransportdetails: state.wizard.localtransportdetails,
        createdBy: state.wizard.createdBy,
        review: state.wizard.review,
        status: state.wizard.status
    })

    return connect(mapStateToProps, { goToPage, goToFirstPage, goToPreviousPage, goToNextPage, fetchWizard, updateWizard, submitWizard, approveWizard, rejectWizard, saveWizard, completeWizard })(Wrapper);
}


export default withWizard;
