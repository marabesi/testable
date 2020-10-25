//@ts-nocheck
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Title from '../title/Title';
import Close from '../icons/Close';

import './modal.scss';

function Modal (props) {
  const onClose = () => props.onClose();

  return (
    <ReactModal
      {...props}
      closeTimeoutMS={10}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      shouldFocusAfterRender={false}
      className="modal"
      overlayClassName="overlay"
    >
      <Title>
        {props.title}
        <Close className="fill-current w-4 h-4 text-white cursor-pointer" onClick={onClose} />
      </Title>
      {props.children}
    </ReactModal>
  );
}

Modal.propTypes = {
  title: PropTypes.object,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;