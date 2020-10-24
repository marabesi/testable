//@ts-nocheck
import * as React from 'react';
import ReactModal from 'react-modal';
import Title from '../title/Title';
import Close from '../icons/Close';

import './modal.scss';

export default class Modal extends React.Component {

  onClose = () => this.props.onClose();

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
      >
        <Title>
          { this.props.title }
          <Close className="fill-current w-4 h-4 text-white cursor-pointer" onClick={this.onClose} />
        </Title>
        {this.props.children}
      </ReactModal>
    );
  }
}
