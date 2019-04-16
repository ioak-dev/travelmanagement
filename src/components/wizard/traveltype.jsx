import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToNextPage, fetchWizard, updateTravelType } from '../../actions/wizardActions';
import ErrorMessage from './errormessage';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import WizardFlow from './wizard-flow';

const componentName = "traveltype";

class Traveltype extends React.Component {

    componentWillMount() {
        this.props.fetchWizard(this.props.id);
        this.setState({
            traveltype: this.props.traveltype}
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.traveltype) {
            this.setState({
                traveltype: nextProps.traveltype},
                () => {console.log(this.state)}
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            errorfields: [],
            errormessages: [],
            traveltype: {
                type: null
            }
        };

        this.handlechange = this.handlechange.bind(this);
        this.nextpage = this.nextpage.bind(this);
        this.saveforlater = this.saveforlater.bind(this)
    }

    render() {
        return (
            <div className="arc-root">
                <form noValidate autoComplete="off">
                    <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                            <WizardFlow saveforlater={this.saveforlater.bind(this)} nextpage={this.nextpage.bind(this)} />
                            </Grid>                              
                        </Grid>
                        <ErrorMessage errors={this.state.errormessages} />

                        <Grid item xs={12}>
                            <Grid container direction="column" justify="center" alignItems="center"  spacing={8}>
                                <Grid item>                            
                                    <Typography variant="h5">What type of travel request do you want to create?</Typography>
                                </Grid>
                                <Grid item>                            
                                    <RadioGroup
                                        aria-label="Travel type"
                                        name="type"
                                        value={this.state.traveltype.type}
                                        onChange={this.handlechange}
                                    >
                                        <FormControlLabel value="domestic" control={<Radio />} label="Domestic" />
                                        <FormControlLabel value="international" control={<Radio />} label="International" />
                                    </RadioGroup>
                                </Grid>                                
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }

    handlechange(event) {
        this.setState(
            {
                traveltype: {
                    ...this.state.traveltype,
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

    nextPageAction(e) {
        this.props.updateTravelType(this.props.id, this.state);
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
        
        const errorfields = [];
        const errormessages = [];
        
        if (this.state.traveltype.type === null) {
            errorfields.push("type");
            errormessages.push("Travel type not selected");
        }

        this.setState({
            errormessages: errormessages
        });

        return errorfields;
    }
}

Traveltype.protoTypes = {
    id: PropTypes.string.isRequired,
    updateTravelType: PropTypes.func.isRequired,
    fetchWizard: PropTypes.func.isRequired,
    currentpage: PropTypes.string,
    traveltype: PropTypes.object
}

const mapStateToProps = state => ({
    currentpage: state.wizard.currentpage,
    traveltype:  state.wizard.traveltype
})

export default connect(mapStateToProps, { goToNextPage, fetchWizard, updateTravelType })(Traveltype)
