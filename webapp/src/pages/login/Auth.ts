// @ts-nocheck
import firebase from 'firebase/app';
import { User } from '../../types/User';

const defaultFirebaseConfig = `{
  "apiKey":"999",
  "authDomain":"https://default.firebaseio.com",
  "databaseURL":"https://default.firebaseio.com",
  "projectId":"default",
  "storageBucket":"",
  "messagingSenderId":"",
  "appId":"999999"
}`;

/* eslint-disable-next-line */
const env = JSON.parse(process.env.REACT_APP_FIREBASE_JSON ||  defaultFirebaseConfig);

require('firebase/database');

firebase.initializeApp(env);

const auth = {
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
  authenticate(): Promise<User> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: User) => {
        if (!user) { reject(); }
        if (user !== null) {
          this.user.uid = user.uid;
          this.user.name = user.displayName || '';
          this.user.email = user.email || '';
          this.user.photo = user.photoURL || '';
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
      
      this.firebaseRef.off();
    }
  },
  canEnter(user, to) {
    if (!user || !user.uid) {
      return {
        flag: false,
        to: '/'
      };
    }

    if (to.pathname !== '/intro' && user.level === 1) {
      return {
        flag: false,
        to: '/intro'
      };
    }

    if (to.pathname !== '/tutorial' && user.level === 2) {
      return {
        flag: false,
        to: '/tutorial'
      };
    }

    if (to.pathname !== '/tutorial-end' && user.level === 3) {
      return {
        flag: false,
        to: '/tutorial-end'
      };
    }

    if (to.pathname !== '/unit-testing-intro' && user.level === 4) {
      return {
        flag: false,
        to: '/unit-testing-intro'
      };
    }

    if (to.pathname !== '/unit-testing' && user.level === 5) {
      return {
        flag: false,
        to: '/unit-testing'
      };
    }

    if (to.pathname !== '/unit-testing-end' && user.level === 6) {
      return {
        flag: false,
        to: '/unit-testing-end'
      };
    }

    if (to.pathname !== '/rocket-01' && user.level === 7) {
      return {
        flag: false,
        to: '/rocket-01'
      };
    }

    if (to.pathname !== '/rocket-02' && user.level === 8) {
      return {
        flag: false,
        to: '/rocket-02'
      };
    }

    if (to.pathname !== '/rocket-03' && user.level === 9) {
      return {
        flag: false,
        to: '/rocket-03'
      };
    }

    if (to.pathname !== '/rocket-03-01' && user.level === 10) {
      return {
        flag: false,
        to: '/rocket-03-01'
      };
    }

    if (to.pathname !== '/rocket-03-02' && user.level === 11) {
      return {
        flag: false,
        to: '/rocket-03-02'
      };
    }

    if (to.pathname !== '/completed-intro' && user.level === 12) {
      return {
        flag: false,
        to: '/completed-intro'
      };
    }

    if (to.pathname !== '/completed-end' && user.level === 13) {
      return {
        flag: false,
        to: '/completed-end'
      };
    }

    if (to.pathname !== '/survey' && user.level === 14) {
      return {
        flag: false,
        to: '/survey'
      };
    }

    if (to.pathname !== '/tdd-intro' && user.level === 15) {
      return {
        flag: false,
        to: '/tdd-intro'
      };
    }

    if (to.pathname !== '/tdd' && user.level > 15) {
      return {
        flag: false,
        to: '/tdd'
      };
    }

    return {
      flag: true
    };
  },
  signout() {
    firebase.auth().signOut();
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

export { auth };