import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import content from './challenge03_01-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

export class Challenge03_01 extends Component {

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
          pathname: '/rocket-02-02',
        }} />
      );
    }

    return (
      <SceneManager
        identifier="Challenge03_01"
        content={content}
        handleLastScene={this.handleLastScene}
      />
    );
  }
}

export default connect()(Challenge03_01);