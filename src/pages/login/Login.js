
import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import uiConfig from './Firebase';
import { Redirect } from 'react-router-dom';
import {fakeAuth} from '../login/Auth';
import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

export default class Login extends Component {
  state = {
    logged: false,
    loading: true
  }

  constructor(props) {
    super(props);

    fakeAuth.authenticate(this.authStatusChanged.bind(this));
  }

  authStatusChanged(user) {
    if (user) {
      this.setState({
        user: user,
        logged: true,
        loading: false
      });
    } else {
      this.setState({
        user: null,
        logged: false,
        loading: false
      }); 
    } 
  }

  componentDidMount() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    if (this.state.logged && this.state.user.tutorial) {
      return (
        <Redirect to={{
          pathname: "/tutorial",
          state: this.state
        }} />
      );
    }

    if (this.state.logged && this.state.user.tutorial === false) {
      return (
        <Redirect to={{
          pathname: "/intro",
          state: this.state
        }} />
      );
    }

    return (
      <React.Fragment>
        <h1 className={this.state.loading ? "" : "hidden"}>Loading</h1>
        <div
          className={
            this.state.loading
              ? "hidden"
              : "flex flex-col justify-center items-center h-screen"
          }
          id="firebaseui-auth-container"
        />
      </React.Fragment>
    );
  }
}