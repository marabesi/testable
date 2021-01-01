import firebase from 'firebase/app';
import config from '../../config';

const uiConfig = {
  signInSuccessUrl: config.publicUrl,
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

  tosUrl: config.firebaseTosUrl,
  privacyPolicyUrl: () => window.location.assign(config.firebasePrivacyUrl)
};

export default uiConfig;
