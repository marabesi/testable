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
      handleLastScene: PropTypes.func,
      className: PropTypes.string,
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
      const { className } = this.props;

      return (
        <SceneManager
          className={className}
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