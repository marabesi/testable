
import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import uiConfig from './Firebase';
import Loading from '../../components/loading/Loading';
import { Redirect } from 'react-router-dom';
import { auth } from '../login/Auth';
import { connect } from 'react-redux';
import { setUser } from '../../actions/userAction';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: loggedUser => dispatch(setUser(loggedUser))
  };
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user
});

export class Login extends Component {
  state = {
    logged: false,
    loading: true
  }

  constructor(props) {
    super(props);

    auth.authenticate(this.authStatusChanged);
  }

  authStatusChanged = (user) => {
    if (user) {
      this.props.setUser(user);
      this.setState({
        user: user,
        logged: true,
        loading: false
      });
      return;
    }

    this.props.setUser({});
    this.setState({
      user: null,
      logged: false,
      loading: false
    });
  }

  componentDidMount() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  componentWillUnmount() {
    auth.unsubscribe();
  }

  render() {
    if (this.state.logged) {
      return (
        <Redirect to={{
          pathname: '/intro',
          state: this.state
        }} />
      );
    }

    return (
      <React.Fragment>
        { this.state.loading && <Loading /> }

        <div
          className={
            this.state.loading
              ? 'hidden'
              : 'flex flex-col justify-center items-center h-screen'
          }
          id='firebaseui-auth-container'
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);