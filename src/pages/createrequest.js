import React from 'react'
import Login from './login'
import Traveltype from '../components/wizard/traveltype';

class CreateRequest extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {loggedInUserEmail: null, id: '10ASJ20190401001'};

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
                <Traveltype id={this.state.id}/>
            );
        }
    }
}
export default CreateRequest