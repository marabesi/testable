import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import uiConfig from './Firebase';
import { auth } from '../login/Auth';
import { track } from '../../emitter/Tracking';
import { setUser } from '../../actions/userAction';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

const mapStateToProps = (state: { userReducer: { user: any; }; }) => ({
  user: state.userReducer.user,
});

interface LoginProps {
  setUser: Function;
  user: any;
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
  };
};

export class Login extends Component<LoginProps> {
  state = {
    showFirebaseWidget: false
  }

  constructor(props: LoginProps) {
    super(props);

    auth
      .authenticate()
      .then(this.authStatusChanged)
      .catch(this.authStatusChanged);
  }

  authStatusChanged = (user: any) => {
    this.props.setUser(user);

    if (user) {
      track({
        section: 'login',
        action: 'auth_changed'
      });

      this.setState({
        showFirebaseWidget: false,
      });

      return;
    }

    this.setState({
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
    if (this.props.user && this.props.user.uid) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
