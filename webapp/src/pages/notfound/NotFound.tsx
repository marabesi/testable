import { Component } from 'react';

import '../../scss/shake-horizontal.scss';

export default class NotFound extends Component {

  render() {
    return (
      <div className="flex justify-center items-center text-white">
        <h1 className="shake-horizontal">Página não encontrada!</h1>
      </div>
    );
  }
}
