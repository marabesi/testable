import React, { Component } from 'react';
import Background from '../../components/background/Background';
import SceneManager from '../../components/scene-manager/SceneManager';
import content from './completed-content.json';

export default class Completed extends Component {

  render() {
    return (
      <Background>
        <SceneManager
          content={content}
          handleLastScene={this.handleLastScene}
        />
      </Background>
    );
  }
}
