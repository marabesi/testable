import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import uiConfig from './Firebase';
import Loading from '../../components/loading/Loading';
import { Redirect } from 'react-router-dom';
import { auth } from '../login/Auth';
import { track } from '../../emitter/Tracking';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

export default class Login extends Component {
  state = {
    logged: false,
    loading: true,
    user: {}
  }

  constructor(props) {
    super(props);

    auth.authenticate(this.authStatusChanged);
  }

  authStatusChanged = (user) => {
    if (user) {
      track({
        section: 'login',
        action: 'auth_changed'
      });

      this.setState({
        user: user,
        logged: true,
        loading: false
      });
      return;
    }

    this.setState({
      user: {},
      logged: false,
      loading: false
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
    if (this.state.logged) {
      return (
        <Redirect to={{ pathname: '/intro' }} />
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
