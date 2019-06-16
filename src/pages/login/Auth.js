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
          progress: 10,
        };

        vm.firebaseRef = firebase
          .database()
          .ref()
          .child('users/' + user.uid);

        vm.firebaseRef.once('value', (snapshot) => {
          const userObject = snapshot.val();

          if (userObject && userObject.tutorial) {
            userDefault.tutorial = userObject.tutorial;
          }

          if (userObject && userObject.level) {
            userDefault.level = userObject.level;
          }
          if (userObject && userObject.progress) {
            userDefault.progress = userObject.progress;
          }

          vm.isAuthenticated = true;
          vm.user = userDefault;
          
          cb(userDefault);
        });
      }
    });
  },
  /**
   * Unsubscribe from the firebase database to prevent react warnings.
   */
  unsubscribe() {
    if (this.firebaseRef) {
      this.firebaseRef.off();
    }
  },
  canEnter(from, to) {
    if (!this.isAuthenticated) {
      return {
        flag: false,
        to: '/'
      };
    }

    if (to.pathname !== '/intro' && this.user.level === 1) {
      return {
        flag: false,
        to: '/intro'
      };
    }

    if (to.pathname !== '/tutorial' && this.user.level === 2) {
      return {
        flag: false,
        to: '/tutorial'
      };
    }

    if (to.pathname !== '/tutorial-end' && this.user.level === 3) {
      return {
        flag: false,
        to: '/tutorial-end'
      };
    }

    if (to.pathname !== '/tdd' && this.user.level === 4) {
      return {
        flag: false,
        to: '/tdd'
      };
    }

    if (to.pathname !== '/completed' && this.user.level > 4) {
      return {
        flag: false,
        to: '/completed'
      };
    }

    return {
      flag: true
    };
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
  },
  insertUserInfo(data, child) {
    const firebaseRef = firebase
      .database()
      .ref()
      .child('users/' + this.user.uid + '/' + child);
    firebaseRef.push(data);
  },
};

export {auth};