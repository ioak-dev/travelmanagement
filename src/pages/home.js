import React from 'react'
import { connect } from 'react-redux';
import { reloadLoggedUser } from '../actions/userActions';

class Home extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
    // this.props.reloadLoggedUser(sessionStorage.getItem('userSigninName'));
  }

  render() {
    return (
      <h1>Home</h1>
    );
  }

}

const mapStateToProps = state => ({
  loggedUser: state.user.loggedUser
})

export default connect(mapStateToProps, {reloadLoggedUser}) (Home);