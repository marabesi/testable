//@ts-nocheck
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { track } from '../../emitter/Tracking';

import './level.scss';

export class Level extends Component {

  onClick = () => {
    track({
      section: 'level',
      action: 'level_progress|click'
    });
  }

  render() {
    const { level, progress, intl } = this.props;
    return (
      <div className="flex level py-3" onClick={this.onClick}>
        <h1 className="title mr-3 text-white text-base uppercase font-medium">{intl.messages.level.label} {level}</h1>
        <div className="progress-holder py-1 px-2" title={`${progress} %`}>
          <div className={`progress py-1 progress-${progress}`} />
        </div>
      </div>
    );
  }
}

Level.propTypes = {
  /**
   * A number representing the level: 0, 1, 20, 2400, 9999. There is no restrictions.
   */
  level: PropTypes.number,
  /**
   * A percentage representing the progress from 0 to 100. The progress is used as percentage, the minimum is 0 (zero)
   * and the maximum is 100. Any number greater than 100, is going to be displayed as if it were 100.
   */
  progress: PropTypes.number,
  intl: PropTypes.object,
};

Level.defaultProps = {
  intl: {
    messages: {
      level: {}
    }
  }
};

export default injectIntl(Level);
