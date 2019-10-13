import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

const WrappedSceneContentManager = (identifier, content, redirectTo) => {

  class SceneContentManager extends Component {

    propTypes = {
      history: PropTypes.object
    }

    handleLastScene = () => {
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