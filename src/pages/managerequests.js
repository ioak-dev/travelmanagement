import React from 'react'
import Login from './login';
import View from '../components/view';

class ManageRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedInUserEmail: null};
    }

    componentDidMount() {
        if (sessionStorage.getItem('userSigninName')) {
            this.setState({loggedInUserEmail: sessionStorage.getItem('userSigninName')});
        }
    }

    render() {
        if (!this.state.loggedInUserEmail) {
            return (
                <Login />
            );
        } else {
            return (
                <View type='REVIEWER' history={this.props.history} />
            );
        }
    }
}

export default ManageRequests