import firebase from 'firebase/app';
import env from '../env.json';

require('firebase/database');

firebase.initializeApp(env);

const fakeAuth = {
  isAuthenticated: false,
  user: {},

  authenticate(cb) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) { cb() }
      if (user !== null) {
        this.isAuthenticated = true;

        const userDefault = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          level: 1,
          tutorial: false,
        };

        const userData = firebase.database().ref().child('users/' + user.uid);
        userData.on('value', (snapshot) => {
          const userObject = snapshot.val();

          if (userObject !== null) {
            userDefault.tutorial = userObject.tutorial;
            userDefault.level = userObject.level;
          }

          cb(userDefault);
        })
      }
    })
  },
  signout(cb) {
    firebase.auth().signOut();
    this.isAuthenticated = false;
    cb();
  }
};

export {fakeAuth}