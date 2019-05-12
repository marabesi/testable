import React, { Component } from 'react';
import SceneManager from '../../components/scene-manager/SceneManager';
import content from './end-content.json';

export default class End extends Component {

  render() {
    return (
      <SceneManager content={content} />
    );
  }
}