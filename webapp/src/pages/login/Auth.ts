// @ts-nocheck
import firebase from 'firebase/app';
import Routes from './Routes';
import { User } from '../../packages/types/User';
import config from '../../config';

const defaultFirebaseConfig = `{
  "apiKey":"999",
  "authDomain":"https://default.firebaseio.com",
  "databaseURL":"https://default.firebaseio.com",
  "projectId":"default",
  "storageBucket":"",
  "messagingSenderId":"",
  "appId":"999999"
}`;

const env = JSON.parse(config.firebaseJson ||  defaultFirebaseConfig);

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
        to: Routes.HOME,
      };
    }

    if (to.pathname !== Routes.INTRO && user.level === 1) {
      return {
        flag: false,
        to: Routes.INTRO
      };
    }

    if (to.pathname !== Routes.TUTORIAL_START && user.level === 2) {
      return {
        flag: false,
        to: Routes.TUTORIAL_START
      };
    }

    if (to.pathname !== Routes.TUTORIAL_END && user.level === 3) {
      return {
        flag: false,
        to: Routes.TUTORIAL_END
      };
    }

    if (to.pathname !== Routes.UNIT_TEST_INTRO && user.level === 4) {
      return {
        flag: false,
        to: Routes.UNIT_TEST_INTRO
      };
    }

    if (to.pathname !== Routes.UNIT_TEST && user.level === 5) {
      return {
        flag: false,
        to: Routes.UNIT_TEST
      };
    }

    if (to.pathname !== Routes.UNIT_TEST_END && user.level === 6) {
      return {
        flag: false,
        to: Routes.UNIT_TEST_END
      };
    }

    if (to.pathname !== Routes.CHALLENGE_01 && user.level === 7) {
      return {
        flag: false,
        to: Routes.CHALLENGE_01
      };
    }

    if (to.pathname !== Routes.CHALLENGE_02 && user.level === 8) {
      return {
        flag: false,
        to: Routes.CHALLENGE_02
      };
    }

    if (to.pathname !== Routes.CHALLENGE_03 && user.level === 9) {
      return {
        flag: false,
        to: Routes.CHALLENGE_03
      };
    }

    if (to.pathname !== Routes.CHALLENGE_03_01 && user.level === 10) {
      return {
        flag: false,
        to: Routes.CHALLENGE_03_01
      };
    }

    if (to.pathname !== Routes.CHALLENGE_03_02 && user.level === 11) {
      return {
        flag: false,
        to: Routes.CHALLENGE_03_02
      };
    }

    if (to.pathname !== Routes.CHALLENGE_COMPLETED_START && user.level === 12) {
      return {
        flag: false,
        to: Routes.CHALLENGE_COMPLETED_START
      };
    }

    if (to.pathname !== Routes.CHALLENGE_COMPLETED_END && user.level === 13) {
      return {
        flag: false,
        to: Routes.CHALLENGE_COMPLETED_END
      };
    }

    if (to.pathname !== Routes.SURVEY && user.level === 14) {
      return {
        flag: false,
        to: Routes.SURVEY
      };
    }

    if (to.pathname !== Routes.TDD_START && user.level === 15) {
      return {
        flag: false,
        to: Routes.TDD_START
      };
    }

    if (to.pathname !== Routes.TDD && user.level > 15) {
      return {
        flag: false,
        to: Routes.TDD
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