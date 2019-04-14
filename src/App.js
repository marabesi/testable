import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Introduction from './pages/introduction/Introduction';
import Tutorial from './pages/tutorial/Tutorial';
import ProtectedRoute from './pages/login/router/ProtectedRoute';
import NotFound from './pages/notfound/NotFound';

import './app.scss';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="stars"></div>
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute path="/intro" component={Introduction} />
            <ProtectedRoute path="/tutorial" component={Tutorial} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
