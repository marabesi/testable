import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AsyncComponent from './components/AsyncComponent';
import ProtectedRoute from './pages/login/router/ProtectedRoute';
import { spring, AnimatedSwitch } from 'react-router-transition';

import './app.scss';

const Introduction = AsyncComponent(() => {
  return import('./pages/introduction/Introduction');
});
const Tutorial = AsyncComponent(() => {
  return import('./pages/tutorial/Tutorial');
});
const NotFound = AsyncComponent(() => {
   return import('./pages/notfound/NotFound');
});

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 42,
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
    scale: 1,
  }
};
class App extends Component {

  render() {
    return (
      <React.Fragment>
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
          <Route path="*" component={NotFound} />
        </AnimatedSwitch>
      </React.Fragment>
    );
  }
}

export default App;
