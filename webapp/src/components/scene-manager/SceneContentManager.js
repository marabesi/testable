import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

const WrappedSceneContentManager = (identifier, content, redirectTo) => {

  class SceneContentManager extends Component {

    state = {
      redirect: false,
    };

    handleLastScene = () => {
      Emitter.emit(LEVEL_UP, {
        tutorial: true,
      });

      setTimeout(() => {
        this.setState({
          redirect: true
        });
      }, 1000);
    }

    render() {
      if (this.state.redirect) {
        return (
          <Redirect to={{
            pathname: redirectTo,
          }} />
        );
      }

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