import * as React from 'react';
import ReactModal from 'react-modal';

import './modal.scss';

export default class Modal extends React.Component {

  render() {
    return (
      <ReactModal
        { ...this.props }
        closeTimeoutMS={10}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        shouldFocusAfterRender={false}
        className="modal"
        overlayClassName="overlay"
      />
    );
  }
}
