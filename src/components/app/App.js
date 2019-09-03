//@ts-nocheck
import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { IntlProvider } from 'react-intl';
import { mapStyles, bounceTransition } from './transition';
import ProtectedRoute from '../../pages/login/router/ProtectedRoute';
import Sidebar from '../sidebar/Sidebar';
import Queue from '../../queue/queue';
import Loading from '../loading/Loading';
import Emitter, { TRACKING } from '../../emitter/Emitter';
import { auth } from '../../pages/login/Auth';

import './app.scss';

const isDebug = process.env.REACT_APP_DEBUG || false;
const queue = new Queue();
const messages = {
  en: require('../../locale/en').default,
  'pt-br': require('../../locale/pt-br').default,
};

const Introduction = lazy(() => import('../../pages/introduction/Introduction'));

const Login = lazy(() => import('../../pages/login/Login'));

const Tutorial = lazy(() => import('../../pages/tutorial/Tutorial'));

const NotFound = lazy(() => import('../../pages/notfound/NotFound'));

const TutorialEnd = lazy(() => import('../../pages/tutorial-end/TutorialEnd'));

const TddIntro = lazy(() => import('../../pages/tdd-intro/TddIntro'));

const Tdd = lazy(() => import('../../pages/tdd/Tdd'));

const TddEnd = lazy(() => import('../../pages/tdd-end/TddEnd'));

const Rocket01 = lazy(() => import('../../pages/rocket-01/Rocket01'));

const Rocket02 = lazy(() => import('../../pages/rocket-02/Rocket02'));

const Rocket03 = lazy(() => import('../../pages/rocket-03/Rocket03'));

const Completed = lazy(() => import('../../pages/completed/Completed'));

const Survey = lazy(() => import('../../pages/survey/Survey'));

const assets = [
  'assets/buggy.png',
  'assets/buggy.svg',
  'assets/buggy-bug.svg',
  'assets/buggy-zzz.svg',
  'assets/alien.png',
  'assets/logo.png',
  'assets/placeholder.svg',
  'assets/mp3/keyboard.mp3',
];

/**
 * @param {object} state
 */
const mapStateToProps = state => ({
  locale: state.localeReducer.locale,
});

export class App extends Component {

  state = {
    isFetchingAssets: true
  }

  async componentDidMount() {
    // @ts-ignore
    Emitter.addListener(TRACKING, data => {
      if (isDebug) {
        /* eslint-disable-next-line */
        console.warn(data);
        return;
      }

      auth.insertUserInfo(data, 'tracking');
    });

    queue.clearStorage(assets);

    await queue.fetch(assets);

    this.setState({
      isFetchingAssets: false
    });
  }

  componentWillUnmount() {
    Emitter.removeAllListeners(TRACKING);
  }

  render() {
    if (this.state.isFetchingAssets) {
      return (
        <Loading />
      );
    }

    const { locale } = this.props;

    return (
      <Suspense delay={700} fallback={<Loading />}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Sidebar>
            <AnimatedSwitch
              atEnter={bounceTransition.atEnter}
              atLeave={bounceTransition.atLeave}
              atActive={bounceTransition.atActive}
              mapStyles={mapStyles}
              className="App"
            >
              <Route exact path="/" component={Login} />
              <ProtectedRoute path="/intro" component={Introduction} />
              <ProtectedRoute path="/tutorial" component={Tutorial} />
              <ProtectedRoute path="/tutorial-end" component={TutorialEnd} />
              <ProtectedRoute path="/tdd-intro" component={TddIntro} />
              <ProtectedRoute path="/tdd" component={Tdd} />
              <ProtectedRoute path="/tdd-end" component={TddEnd} />
              <ProtectedRoute path="/rocket-01" component={Rocket01} />
              <ProtectedRoute path="/rocket-02" component={Rocket02} />
              <ProtectedRoute path="/rocket-03" component={Rocket03} />
              <ProtectedRoute path="/completed" component={Completed} />
              <ProtectedRoute path="/survey" component={Survey} />
              <Route path="*" component={NotFound} />
            </AnimatedSwitch>
          </Sidebar>
        </IntlProvider>
      </Suspense>
    );
  }
}

export default connect(mapStateToProps)(App);