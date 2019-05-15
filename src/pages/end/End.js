import React, { Component } from 'react';
import SceneManager from '../../components/scene-manager/SceneManager';
import content from './end-content.json';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, {LEVEL_UP} from '../../emitter/Emitter';
import { Redirect } from 'react-router-dom';

export default class End extends Component {

  state ={
    redirect: false
  };

  constructor() {
    super();
    this.handleLastScene = this.handleLastScene.bind(this);
  }

  handleLastScene() {
    Emitter.emit(LEVEL_UP, {
      tutorial: true,
    });

    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        redirect: true
      });
    }, 2000);
  }

  goToTutorial() {
    auth.updateUserInfo({
      tutorial: true,
      level: 2
    });
    window.location.reload();
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/tdd',
        }} />
      );
    }
    return (
      <React.Fragment>
        <DebugButton onClick={this.goToTutorial} value="tutorial" />
        <SceneManager
          content={content}
          handleLastScene={this.handleLastScene}
        />
      </React.Fragment>
    );
  }
}
