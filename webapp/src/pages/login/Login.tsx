// @ts-nocheck
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import Routes from './Routes';
import { auth } from './Auth';
import { track } from '../../packages/emitter/Tracking';
import { setUser } from '../../data-flow/redux/actions/userAction';
import { User } from '../../packages/types/User';
import config, { TEST_MODE } from '../../config';
import LanguageSelector from '../../components/ui/interface/language-selector/LanguageSelector';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

const mapStateToProps = (state: { userReducer: { user: User; }; }) => ({
  user: state.userReducer.user,
  locale: state.localeReducer.locale,
});

interface LoginProps {
  setUser: Function;
  user?: User;
  locale: string;
}

const firebaseResolver = language => require('../../third-party/wrappers/firebaseui/npm__' + language);

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
  };
};

export const Login = ({ setUser, user, locale }: LoginProps) => {
  const [showFirebaseWidget, setShowFirebaseWidget] = useState(false);

  const authStatusChanged = (loggedUser: User) => {
    setUser(loggedUser);

    if (loggedUser) {
      track({
        section: 'login',
        action: 'auth_changed'
      });

      setShowFirebaseWidget({
        showFirebaseWidget: false,
      });

      return;
    }

    setShowFirebaseWidget({
      showFirebaseWidget: true,
    });
  };

  useEffect(() => {
    const firebaseui = firebaseResolver(locale.replace('-', '_'));
    
    if (config.env !== TEST_MODE) {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }

      auth
        .authenticate()
        .then(authStatusChanged)
        .catch(authStatusChanged);
      
      const uiConfig = {
        signInSuccessUrl: config.publicUrl || '/',
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

      ui.start('#firebaseui-auth-container', uiConfig);
    }

    return () => {
      auth.unsubscribe();
    };
  }, []);

  if (user && user.uid) {
    return (
      <Redirect to={{ pathname: Routes.INTRO }} />
    );
  }

  return (
    <div
      className={
        !showFirebaseWidget
          ? 'hidden'
          : 'flex flex-col justify-center items-center h-screen'
      }
      id='firebaseui-auth-container'
    >
      <LanguageSelector />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
