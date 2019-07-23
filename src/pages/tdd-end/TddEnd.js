import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import content from './tdd-end-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Loading from '../../components/loading/Loading';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';

export default class TddEnd extends Component {

  state = {
    loading: false,
    redirect: false
  };

  handleLastScene = () => {
    Emitter.emit(LEVEL_UP);

    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        redirect: true
      });
    }, 1000);
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

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
