import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import content from './completed-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import {onLoading} from '../../actions/loadingAction';

const mapDispatchToProps = (dispatch) => {
  return {
    onLoading: loading => dispatch(onLoading(loading))
  };
};

export class Completed extends Component {

  state = {
    redirect: false,
  };

  handleLastScene = () => {
    Emitter.emit(LEVEL_UP);

    this.props.onLoading(true);

    setTimeout(() => {
      this.setState({
        redirect: true
      });
      this.props.onLoading(false);
    }, 1000);
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/survey',
        }} />
      );
    }

    return (
      <SceneManager
        identifier="completed"
        content={content}
        handleLastScene={this.handleLastScene}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(Completed);
