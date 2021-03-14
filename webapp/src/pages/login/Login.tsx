// @ts-nocheck
import { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import uiConfig from './Firebase';
import Routes from './Routes';
import { auth } from '../login/Auth';
import { track } from '../../packages/emitter/Tracking';
import { setUser } from '../../data-flow/redux/actions/userAction';
import { User } from '../../packages/types/User';
import config, { TEST_MODE } from '../../config';
import LanguageSelector from '../../components/ui/interface/language-selector/LanguageSelector';

import './firebase/mdl.scss';
import './firebase/firebase-ui.scss';

const mapStateToProps = (state: { userReducer: { user: User; }; }) => ({
  user: state.userReducer.user,
});

interface LoginProps {
  setUser: Function;
  user?: User;
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
  };
};

export class Login extends Component<LoginProps> {
  state = {
    showFirebaseWidget: false
  }

  constructor(props: LoginProps) {
    super(props);

    auth
      .authenticate()
      .then(this.authStatusChanged)
      .catch(this.authStatusChanged);
  }

  authStatusChanged = (user: User) => {
    this.props.setUser(user);

    if (user) {
      track({
        section: 'login',
        action: 'auth_changed'
      });

      this.setState({
        showFirebaseWidget: false,
      });

      return;
    }

    this.setState({
      showFirebaseWidget: true,
    });
  }

  componentDidMount() {
    if (config.env !== TEST_MODE) {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

  componentWillUnmount() {
    auth.unsubscribe();
  }

  render() {
    if (this.props.user && this.props.user.uid) {
      return (
        <Redirect to={{ pathname: Routes.INTRO }} />
      );
    }

    return (
      <div
        className={
          !this.state.showFirebaseWidget
            ? 'hidden'
            : 'flex flex-col justify-center items-center h-screen'
        }
        id='firebaseui-auth-container'
      >
        <LanguageSelector />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
