import React, { Component } from 'react';
import SceneManager from '../../components/scene-manager/SceneManager';
import content from './introduction-content.json';

export default class Introduction extends Component {

  render() {
    return (
      <SceneManager content={content} />
    );
  }
}
