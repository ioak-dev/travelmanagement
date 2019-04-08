import React from 'react'
import Traveltype from './traveltype';
import Clientinfo from './clientinfo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWizard } from '../../actions/wizardActions';
import Domestic from './domestic';
import International from './international';

class Wizard extends React.Component {
    
    componentWillMount() {
        this.props.fetchWizard(this.props.id);
    }

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                {this.props.currentpage === 1 && <Traveltype />}
                {this.props.currentpage === 2 && <Clientinfo />}
                {this.props.currentpage === 3 && <Domestic />}
                {this.props.currentpage === 4 && <International />}
            </div>
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