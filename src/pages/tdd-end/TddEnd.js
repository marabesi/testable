import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import content from './tdd-end-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';
import Emitter, { LEVEL_UP } from '../../emitter/Emitter';
import { onLoading } from '../../actions/loadingAction';

/**
 * @param {function} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    /**
     * @param {boolean} hovered
     */
    onLoading: loading => dispatch(onLoading(loading))
  };
};

export class TddEnd extends Component {

  state = {
    redirect: false
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

export default connect(null, mapDispatchToProps)(TddEnd);