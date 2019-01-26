import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import env from '../env.json';
import Map from '../map/Map';
import uiConfig from './Firebase';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(env);
    firebase.auth().onAuthStateChanged(this.authStatusChanged.bind(this));

    this.onLogout = this.onLogout.bind(this);

    this.state = {
      isLogged: false
    };
  }

  authStatusChanged(user) {
    if (user !== null) {
      this.setState({
        isLogged: true,
        user: user,
      });
    }

    if (user === null) {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

  onLogout() {
    firebase.auth().signOut();

    this.setState({
      isLogged: false,
      user: null,
    });
  }

  render() {
    if (this.state.isLogged) {
      return (
        <div>
          <Map user={this.state.user}/>
          <button onClick={this.onLogout}>Logout</button>
        </div>
      )
    }

    return (
      <div>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}