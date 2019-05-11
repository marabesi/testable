import firebase from 'firebase/app';
import env from '../../env.json';

require('firebase/database');

firebase.initializeApp(env);

const auth = {
  isAuthenticated: false,
  user: {},
  firebaseRef: null,

  authenticate(cb) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) { cb(); }
      if (user !== null) {
        const vm = this;
        const userDefault = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          level: 1,
          tutorial: false,
          introduction: true,
        };

        vm.firebaseRef = firebase
          .database()
          .ref()
          .child('users/' + user.uid);

        vm.firebaseRef.on('value', (snapshot) => {
          const userObject = snapshot.val();

          if (userObject !== null) {
            userDefault.tutorial = userObject.tutorial;
            userDefault.level = userObject.level;
          }

          vm.isAuthenticated = true;
          vm.user = userDefault;

          cb(userDefault);
        });
      }
    });
  },
  unsubscribe() {
    if (this.firebaseRef) {
      this.firebaseRef.off();
    }
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
  /**
   * updates the user info based on the javascript object passed in the data
   * param. For instance, an object with a single key named "level", will update
   * only the key level on firebase and here, in the user property.
   */
  updateUserInfo(data) {
    const firebaseRef = firebase
      .database()
      .ref()
      .child('users/' + this.user.uid);

    firebaseRef.update(data);

    for (let prop in data) {
      this.user[prop] = data[prop];
    }
  }
};

export {auth};