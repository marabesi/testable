import React, { Component } from 'react';
import SceneManager from '../../components/scene-manager/SceneManager';
import content from './end-content.json';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';

export default class End extends Component {

  goToTutorial() {
    auth.updateUserInfo({
      tutorial: true,
      level: 2
    });
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <DebugButton onClick={this.goToTutorial} value="tutorial" />
        <SceneManager content={content} />
      </React.Fragment>
    );
  }
}
