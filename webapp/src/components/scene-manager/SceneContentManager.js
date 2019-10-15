import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

const WrappedSceneContentManager = (
  identifier,
  content,
  redirectTo
) => {
  class SceneContentManager extends Component {

    static propTypes = {
      history: PropTypes.object,
      handleLastScene: PropTypes.func
    }

    handleLastScene = () => {
      if (this.props.handleLastScene) {
        this.props.handleLastScene();
        return;
      }

      Emitter.emit(LEVEL_UP, {
        tutorial: true,
      });

      setTimeout(() => {
        this.props.history.push(redirectTo);
      }, 1000);
    }

    render() {
      return (
        <SceneManager
          identifier={identifier}
          content={content}
          handleLastScene={this.handleLastScene}
        />
      );
    }
  }

  return SceneContentManager;
};

export default WrappedSceneContentManager;