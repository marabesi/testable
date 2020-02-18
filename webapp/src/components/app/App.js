import React, { Component, Suspense, lazy  } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { mapStyles, bounceTransition } from './transition';
import ProtectedRoute from '../../pages/login/router/ProtectedRoute';
import { messages } from '../../constants/locale';
import Queue from '../../queue/queue';
import Loading from '../loading/Loading';
import NotFound from '../../pages/notfound/NotFound';
import Sidebar from '../sidebar/Sidebar';
import Login from '../../pages/login/Login';
import Emitter, { TRACKING } from '../../emitter/Emitter';
import ErrorBoundary from './ErrorBoundary';
import { auth } from '../../pages/login/Auth';

import './app.scss';

const Introduction = lazy(() => import('../../pages/introduction/Introduction'));
const Tutorial = lazy(() => import('../../pages/tutorial/Tutorial'));
const TutorialEnd = lazy(() => import('../../pages/tutorial-end/TutorialEnd'));
const UnitTestingIntro = lazy(() => import('../../pages/unit-testing-intro/UnitTestingIntro'));
const UnitTesting = lazy(() => import('../../pages/unit-testing/UnitTesting'));
const UnitTestingEnd = lazy(() => import('../../pages/unit-testing-end/UnitTestingEnd'));
const Rocket01 = lazy(() => import('../../pages/rocket-01/Rocket01'));
const Rocket02 = lazy(() => import('../../pages/rocket-02/Rocket02'));
const Rocket03 = lazy(() => import('../../pages/rocket-03/Rocket03'));
const Challenge03_01 = lazy(() => import('../../pages/rocket-03/Challenge03_01'));
const Challenge03_02 = lazy(() => import('../../pages/rocket-03/Challenge03_02'));
const CompletedIntro = lazy(() => import('../../pages/completed-intro/CompletedIntro'));
const CompletedEnd = lazy(() => import('../../pages/completed-end/CompletedEnd'));
const Survey = lazy(() => import('../../pages/survey/Survey'));
const TddIntro = lazy(() => import('../../pages/tdd-intro/TddIntro'));
const Tdd = lazy(() => import('../../pages/tdd/Tdd'));

const isDebug = process.env.REACT_APP_DEBUG || false;
const queue = new Queue();

const assets = [
  '/assets/buggy-rocket.png',
  '/assets/buggy-right.png',
  '/assets/buggy-happy.png',
  '/assets/buggy-happy-left.png',
  '/assets/buggy-left.png',
  '/assets/buggy-bug.png',
  '/assets/buggy-zzz.png',
  '/assets/alien.png',
  '/assets/alien-rocket.png',
  '/assets/logo.png',
  '/assets/placeholder.svg',
  '/assets/mp3/keyboard.mp3',
];

const mapStateToProps = state => ({
  locale: state.localeReducer.locale,
});

export class App extends Component {

  state = {
    isFetchingAssets: true
  }

  async componentDidMount() {
    
    Emitter.addListener(TRACKING, data => {
      if (isDebug) {
        /* eslint-disable-next-line */
        console.warn(data);
        return;
      }

      auth.insertUserInfo(data, 'tracking');
    });

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
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
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
                <ProtectedRoute path="/unit-testing-intro" component={UnitTestingIntro} />
                <ProtectedRoute path="/unit-testing" component={UnitTesting} />
                <ProtectedRoute path="/unit-testing-end" component={UnitTestingEnd} />
                <ProtectedRoute path="/rocket-01" component={Rocket01} />
                <ProtectedRoute path="/rocket-02" component={Rocket02} />
                <ProtectedRoute path="/rocket-03" component={Rocket03} />
                <ProtectedRoute path="/rocket-03-01" component={Challenge03_01} />
                <ProtectedRoute path="/rocket-03-02" component={Challenge03_02} />
                <ProtectedRoute path="/completed-intro" component={CompletedIntro} />
                <ProtectedRoute path="/completed-end" component={CompletedEnd} />
                <ProtectedRoute path="/survey" component={Survey} />
                <ProtectedRoute path="/tdd-intro" component={TddIntro} />
                <ProtectedRoute path="/tdd" component={Tdd} />
                <Route path="*" component={NotFound} />
              </AnimatedSwitch>
            </Sidebar>
          </IntlProvider>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string
};

export default connect(mapStateToProps)(App);