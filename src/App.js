import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './login/Login';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="stars"></div>
        <Route path="/" component={Login} />
      </div>
    );
  }
}

export default App;
