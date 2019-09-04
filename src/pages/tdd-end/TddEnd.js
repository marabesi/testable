import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import content from './tdd-end-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

export class TddEnd extends Component {

  state = {
    redirect: false
  };

  handleLastScene = () => {
    Emitter.emit(LEVEL_UP);

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
          pathname: '/rocket-01',
        }} />
      );
    }
    return (
      <SceneManager
        identifier="tdd-end"
        content={content}
        handleLastScene={this.handleLastScene}
      />
    );
  }
}

export default connect()(TddEnd);