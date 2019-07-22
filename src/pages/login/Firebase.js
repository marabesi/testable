import firebase from 'firebase/app';

/* eslint-disable */
const tosUrl = process.env.REACT_APP_TOS_URL || '';
const privacyUrl = process.env.REACT_APP_PRIVACY_URL || '';
const signInUrl = process.env.REACT_APP_BASE_NAME || '/';
/* eslint-enable */

const uiConfig = {
  signInSuccessUrl: signInUrl,
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
      ]
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],

  tosUrl: tosUrl,
  privacyPolicyUrl: () => window.location.assign(privacyUrl)
};

export default uiConfig;
