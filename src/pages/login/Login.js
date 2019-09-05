import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import uiConfig from './Firebase';
import { auth } from '../login/Auth';
import { track } from '../../emitter/Tracking';
import { setUser } from '../../actions/userAction';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

/**
 * @param {function} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

export class Login extends Component {
  state = {
    showFirebaseWidget: false,
    user: null,
  }

  constructor(props) {
    super(props);

    auth
      .authenticate()
      .then(this.authStatusChanged)
      .catch(this.authStatusChanged);
  }

  authStatusChanged = user => {
    this.props.setUser(user);

    if (user) {
      track({
        section: 'login',
        action: 'auth_changed'
      });

      this.setState({
        user,
        showFirebaseWidget: true,
      });

      return;
    }

    this.setState({
      user: null,
      showFirebaseWidget: true,
    });
  }

  componentDidMount() {
    /* eslint-disable-next-line */
    if (process.env.NODE_ENV !== 'test') {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

  componentWillUnmount() {
    auth.unsubscribe();
  }

  render() {
    if (this.state.user) {
      return (
        <Redirect to={{ pathname: '/intro' }} />
      );
    }

    return (
      <div
        className={
          !this.state.showFirebaseWidget
            ? 'hidden'
            : 'flex flex-col justify-center items-center h-screen'
        }
        id='firebaseui-auth-container'
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
