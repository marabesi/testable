
import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import env from '../env.json';
import Map from '../map/Map';
import uiConfig from './Firebase';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

require('firebase/database');

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
      const userDefault = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        level: 1,
        tutorial: true,
      };

      const userData = firebase.database().ref().child('users/' + user.uid);
      userData.on('value', (snapshot) => {
        const userObject = snapshot.val();

        if (userObject !== null) {
          userDefault.tutorial = userObject.tutorial;
          userDefault.level = userObject.level;
        }
  
        this.setState({
          isLogged: true,
          user: userDefault 
        });
      })
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
        <Map user={this.state.user} isTutorial={this.state.user.tutorial}/>
      )
    }

    return (
      <div>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}