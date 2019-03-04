import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './login/Login';
import Introduction from './pages/introduction/Introduction';
import Tutorial from './pages/tutorial/Tutorial';
import ProtectedRoute from './router/ProtectedRoute';

import './App.css';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="App">
        <div className="stars"></div>
          <Route exact path="/" component={Login}/>
          <ProtectedRoute path="/intro" component={Introduction} />
          <ProtectedRoute path="/tutorial" component={Tutorial} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
