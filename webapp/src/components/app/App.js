//@ts-nocheck
import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { mapStyles, bounceTransition } from './transition';
import ProtectedRoute from '../../pages/login/router/ProtectedRoute';
import Queue from '../../queue/queue';
import Loading from '../loading/Loading';
import Sidebar from '../sidebar/Sidebar';
import Introduction from '../../pages/introduction/Introduction';
import Login from '../../pages/login/Login';
import Emitter, { TRACKING } from '../../emitter/Emitter';
import Tutorial from '../../pages/tutorial/Tutorial';
import NotFound from '../../pages/notfound/NotFound';
import TutorialEnd from '../../pages/tutorial-end/TutorialEnd';
import UnitTestingIntro from '../../pages/unit-testing-intro/UnitTestingIntro';
import UnitTesting from '../../pages/unit-testing/UnitTesting';
import UnitTestingEnd from '../../pages/unit-testing-end/UnitTestingEnd';
import Rocket01 from '../../pages/rocket-01/Rocket01';
import Rocket02 from '../../pages/rocket-02/Rocket02';
import Rocket03 from '../../pages/rocket-03/Rocket03';
import Challenge03_01 from '../../pages/rocket-03/Challenge03_01';
import Challenge03_02 from '../../pages/rocket-03/Challenge03_02';
import CompletedIntro from '../../pages/completed-intro/CompletedIntro';
import Survey from '../../pages/survey/Survey';
import { auth } from '../../pages/login/Auth';

import './app.scss';

const isDebug = process.env.REACT_APP_DEBUG || false;
const queue = new Queue();
const messages = {
  en: require('../../locale/en').default,
  'pt-br': require('../../locale/pt-br').default,
};

const assets = [
  '/assets/buggy-right.png',
  '/assets/buggy-happy.png',
  '/assets/buggy-happy-left.png',
  '/assets/buggy-left.png',
  '/assets/buggy-bug.png',
  '/assets/buggy-zzz.png',
  '/assets/alien.png',
  '/assets/logo.png',
  '/assets/placeholder.svg',
  '/assets/mp3/keyboard.mp3',
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

    await queue.fetch(assets);

    setTimeout(() => {
      this.setState({
        isFetchingAssets: false
      });
    }, 500);
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
            <ProtectedRoute path="/survey" component={Survey} />
            <Route path="*" component={NotFound} />
          </AnimatedSwitch>
        </Sidebar>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string
};

export default connect(mapStateToProps)(App);