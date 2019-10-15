import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

/** @param {object} state */
const mapStateToProps = state => ({
  user: state.userReducer.user,
});

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
    showFirebaseWidget: false
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
    if (this.props.user.uid) {
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

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

Login.defaultProps = {
  user: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
