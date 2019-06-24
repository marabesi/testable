import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { track } from '../../emitter/Tracking';

import './level.scss';

export default class Level extends Component {

  onClick = () => {
    track({
      section: 'level',
      action: 'level_progress|click'
    });
  }

  render() {
    return (
      <div className="flex level py-3" onClick={this.onClick}>
        <h1 className="title mr-3 text-white text-base uppercase font-medium">level {this.props.level}</h1>
        <div className="progress-holder py-1 px-2" title={`${this.props.progress} %`}>
          <div className={`progress py-1 progress-${this.props.progress}`} />
        </div>
      </div>
    );
  }
}

Level.propTypes = {
  level: PropTypes.number,
  progress: PropTypes.number
};
