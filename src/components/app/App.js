import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';
import ProtectedRoute from '../../pages/login/router/ProtectedRoute';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Sidebar from '../sidebar/Sidebar';
import { fetcher } from '../../queue/queue';

import './app.scss';
import Loading from '../loading/Loading';

const Introduction = AsyncComponent(() => {
  return import('../../pages/introduction/Introduction');
});

const Login = AsyncComponent(() => {
  return import('../../pages/login/Login');
});

const Tutorial = AsyncComponent(() => {
  return import('../../pages/tutorial/Tutorial');
});

const NotFound = AsyncComponent(() => {
  return import('../../pages/notfound/NotFound');
});

const TutorialEnd = AsyncComponent(() => {
  return import('../../pages/tutorial-end/TutorialEnd');
});

const Tdd = AsyncComponent(() => {
  return import('../../pages/tdd/Tdd');
});

const Completed = AsyncComponent(() => {
  return import('../../pages/completed/Completed');
});

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 180,
    damping: 12,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: 1
  }
};

class App extends Component {

  state = {
    isFetchingAssets: true
  }

  async componentDidMount() {
    await fetcher([
      'assets/buggy.png',
      'assets/alien.png',
      'assets/mp3/keyboard.mp3',
    ]);

    this.setState({
      isFetchingAssets: false
    });
  }

  render() {
    if (this.state.isFetchingAssets) {
      return (
        <Loading />
      );
    }

    return (
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
          <ProtectedRoute path="/tdd" component={Tdd} />
          <ProtectedRoute path="/completed" component={Completed} />
          <Route path="*" component={NotFound} />
        </AnimatedSwitch>
      </Sidebar>
    );
  }
}

export default App;
