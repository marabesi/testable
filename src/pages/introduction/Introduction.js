import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import content from './introduction-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

export class Introduction extends Component {

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
          pathname: '/tutorial',
        }} />
      );
    }

    return (
      <SceneManager
        identifier="introduction"
        content={content}
        handleLastScene={this.handleLastScene}
      />
    );
  }
}

export default connect()(Introduction);