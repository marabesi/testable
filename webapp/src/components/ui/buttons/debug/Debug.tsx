import { Component } from 'react';
import config from '../../../../config';

export default class Debug extends Component {

  render() {
    return (
      <>
        {config.isDebug && <input type="button" className="bg-white m-2" {...this.props} />}
      </>
    );
  }
}