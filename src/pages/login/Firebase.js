import firebase from 'firebase/app';

const uiConfig = {
  /* eslint-disable-next-line */
  signInSuccessUrl: process.env.REACT_APP_BASE_NAME || '/',
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

  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

export default uiConfig;
