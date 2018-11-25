import React, { Component } from 'react';
import './App.css';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import env from './env.json';

const firebaseOauth = firebase.auth;

console.log(firebaseOauth)

const uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        firebaseOauth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};


class App extends Component {

  constructor(...args) {
    super(...args);

    firebase.initializeApp(env);
  }

  componentDidMount() {

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {

    return (
      <div className="App">
        <div id="firebaseui-auth-container"></div>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
