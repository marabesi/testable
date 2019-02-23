import firebase from 'firebase/app';

const firebaseOauth = firebase.auth;

const uiConfig = {
    signInSuccessUrl: process.env.REACT_APP_BASE_NAME,
    signInOptions: [
        firebaseOauth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

export default uiConfig;