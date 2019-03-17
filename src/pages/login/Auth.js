import firebase from 'firebase/app';
import env from '../../env.json';

require('firebase/database');

firebase.initializeApp(env);

const fakeAuth = {
  isAuthenticated: false,
  user: {},

  authenticate(cb) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) { cb() }
      if (user !== null) {
        const vm = this;
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

          vm.isAuthenticated = true;
          vm.user = userDefault;

          cb(userDefault);
        })
      }
    })
  },
  canEnter(location) {
    if (!this.isAuthenticated) {
      return '/';
    }

    if (location.pathname !== '/intro' && !this.user.tutorial) {
      return '/intro';
    }

    if (location.pathname !== '/tutorial' && this.user.tutorial) {
      return '/tutorial';
    }
  },
  signout(cb) {
    firebase.auth().signOut();
    this.isAuthenticated = false;
    this.user = {};
    cb();
  },
  updateUserInfo(data) {
    const userData = firebase.database().ref().child('users/' + this.user.uid);
    userData.set(data)
  }
};

export {fakeAuth}