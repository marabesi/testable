import React, { Component } from 'react';

import './level.scss';

export default class Level extends Component {
  render() {
    return (
      <div className="flex level py-3">
        <h1 className="title mr-3 text-white">level {this.props.level}</h1>
        <div className="progress-holder py-1 px-2 h-8">
          <div className={"progress py-2 progress-" + this.props.progress} />
        </div>
      </div>
    );
  }
}
