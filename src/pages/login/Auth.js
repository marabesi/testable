import firebase from 'firebase/app';

let env = {};

/* eslint-disable-next-line */
if (process.env.NODE_ENV === 'production') {
  env = require('../../env.prod.json');
} else {
  env = require('../../env.json');
}

require('firebase/database');

firebase.initializeApp(env);

const auth = {
  isAuthenticated: false,
  user: {
    uid: '',
    name: '',
    email: '',
    photo: '',
    level: 1,
    tutorial: false,
    introduction: true,
    progress: 10,
  },
  firebaseRef: {
    off: null
  },
  authenticate() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) { reject(); }
        if (user !== null) {
          this.user.uid = user.uid;
          this.user.name = user.displayName || '';
          this.user.email = user.email || '';
          this.user.photo = user.photoURL || '';
          // @ts-ignore
          this.firebaseRef = this.userRef(user);

          const vm = this;

          this.firebaseRef.once('value', snapshot => {
            const userObject = snapshot.val();

            if (userObject && userObject.tutorial) {
              vm.user.tutorial = userObject.tutorial;
            }

            if (userObject && userObject.level) {
              vm.user.level = userObject.level;
            }
            if (userObject && userObject.progress) {
              vm.user.progress = userObject.progress;
            }

            vm.isAuthenticated = true;
            resolve(vm.user);
          });
        }
      });
    });
  },
  /**
   * Unsubscribe from the firebase database to prevent react warnings.
   */
  unsubscribe() {
    if (this.firebaseRef && typeof this.firebaseRef.off === 'function') {
      // @ts-ignore
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

    if (to.pathname !== '/tdd-intro' && this.user.level === 4) {
      return {
        flag: false,
        to: '/tdd-intro'
      };
    }

    if (to.pathname !== '/tdd' && this.user.level === 5) {
      return {
        flag: false,
        to: '/tdd'
      };
    }

    if (to.pathname !== '/tdd-end' && this.user.level === 6) {
      return {
        flag: false,
        to: '/tdd-end'
      };
    }

    if (to.pathname !== '/rocket-01' && this.user.level === 7) {
      return {
        flag: false,
        to: '/rocket-01'
      };
    }

    if (to.pathname !== '/rocket-02' && this.user.level === 8) {
      return {
        flag: false,
        to: '/rocket-02'
      };
    }

    if (to.pathname !== '/rocket-03' && this.user.level === 9) {
      return {
        flag: false,
        to: '/rocket-03'
      };
    }

    if (to.pathname !== '/completed' && this.user.level === 10) {
      return {
        flag: false,
        to: '/completed'
      };
    }

    if (to.pathname !== '/survey' && this.user.level > 10) {
      return {
        flag: false,
        to: '/survey'
      };
    }

    return {
      flag: true
    };
  },
  signout(cb) {
    firebase.auth().signOut();
    this.isAuthenticated = false;
    this.user = {
      uid: '',
      name: '',
      email: '',
      photo: '',
      level: 1,
      tutorial: false,
      introduction: true,
      progress: 10,
    };
    cb();
  },
  /**
   * updates the user info based on the javascript object passed in the data
   * param. For instance, an object with a single key named "level", will update
   * only the key level on firebase and here, in the user property.
   */
  updateUserInfo(data) {
    const userRef = this.userRef(this.user);

    userRef.update(data);

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
  userRef(user) {
    return firebase
      .database()
      .ref()
      .child(`users/${user.uid}`);
  },
  usersRef() {
    return firebase
      .database()
      .ref('users');
  }
};

export {auth};