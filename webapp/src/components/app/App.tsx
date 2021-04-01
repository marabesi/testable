//@ts-nocheck
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import PropTypes from 'prop-types';
import { mapStyles, bounceTransition } from './transition';
import IntlProvider from '../../third-party/wrappers/i18n/IntlProvider';
import ProtectedRoute from '../../pages/login/router/ProtectedRoute';
import Queue from '../../packages/queue/queue';
import Loading from '../ui/interface/loading/Loading';
import Sidebar from '../ui/interface/sidebar/Sidebar';
import Introduction from '../../pages/introduction/Introduction';
import Login from '../../pages/login/Login';
import Emitter, { TRACKING } from '../../packages/emitter/Emitter';
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
import CompletedEnd from '../../pages/completed-end/CompletedEnd';
import Survey from '../../pages/survey/Survey';
import TddIntro from '../../pages/tdd-intro/TddIntro';
import Tdd from '../../pages/tdd/Tdd';
import { auth } from '../../pages/login/Auth';
import Routes from '../../pages/login/Routes';
import config from '../../config';

import './app.scss';

const { isDebug, publicUrl } = config;
const queue = new Queue();

const assets = [
  `${publicUrl}/assets/buggy-rocket.png`,
  `${publicUrl}/assets/buggy-right.png`,
  `${publicUrl}/assets/buggy-happy.png`,
  `${publicUrl}/assets/buggy-happy-left.png`,
  `${publicUrl}/assets/buggy-left.png`,
  `${publicUrl}/assets/buggy-bug.png`,
  `${publicUrl}/assets/buggy-zzz.png`,
  `${publicUrl}/assets/alien.png`,
  `${publicUrl}/assets/alien-rocket.png`,
  `${publicUrl}/assets/logo.png`,
  `${publicUrl}/assets/placeholder.svg`,
  `${publicUrl}/assets/mp3/keyboard.mp3`,
];

const mapStateToProps = (state: any) => ({
  locale: state.localeReducer.locale,
});

export class App extends Component {

  state = {
    isFetchingAssets: true
  }

  async componentDidMount() {
    Emitter.addListener(TRACKING, (data: any) => {
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
      <IntlProvider locale={locale}>
        <Sidebar>
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="App"
          >
            <Route exact path={Routes.HOME} component={Login} />
            <ProtectedRoute path={Routes.INTRO} component={Introduction} />
            <ProtectedRoute path={Routes.TUTORIAL_START} component={Tutorial} />
            <ProtectedRoute path={Routes.TUTORIAL_END} component={TutorialEnd} />
            <ProtectedRoute path={Routes.UNIT_TEST_INTRO} component={UnitTestingIntro} />
            <ProtectedRoute path={Routes.UNIT_TEST} component={UnitTesting} />
            <ProtectedRoute path={Routes.UNIT_TEST_END} component={UnitTestingEnd} />
            <ProtectedRoute path={Routes.CHALLENGE_01} component={Rocket01} />
            <ProtectedRoute path={Routes.CHALLENGE_02} component={Rocket02} />
            <ProtectedRoute path={Routes.CHALLENGE_03} component={Rocket03} />
            <ProtectedRoute path={Routes.CHALLENGE_03_01} component={Challenge03_01} />
            <ProtectedRoute path={Routes.CHALLENGE_03_02} component={Challenge03_02} />
            <ProtectedRoute path={Routes.CHALLENGE_COMPLETED_START} component={CompletedIntro} />
            <ProtectedRoute path={Routes.CHALLENGE_COMPLETED_END} component={CompletedEnd} />
            <ProtectedRoute path={Routes.SURVEY} component={Survey} />
            <ProtectedRoute path={Routes.TDD_START} component={TddIntro} />
            <ProtectedRoute path={Routes.TDD} component={Tdd} />
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
