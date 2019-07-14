import React, { Component } from 'react';
import SceneManager from '../../components/scene-manager/SceneManager';
import content from './completed-content.json';

export default class Completed extends Component {

  render() {
    return (
      <SceneManager
        identifier="completed"
        content={content}
        handleLastScene={ () => {} }
      />
    );
  }
}
