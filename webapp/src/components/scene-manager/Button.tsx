//@ts-nocheck
import PropTypes from 'prop-types';

import './button.scss';

const Button = props =>  {
  const { onClick, description, className, disabled } = props;
  const fullClassName = `button hover:bg-testable-pink-dark focus:outline-none ${className ? className: ''}`;

  return (
    <button className={fullClassName} onClick={onClick} disabled={disabled}>{description}</button>
  );
};

Button.propTypes = {
  /**
   * Custom class to append in the ed of the button element class list.
   */
  className: PropTypes.string,
  /**
   * The text that goes inside the button.
   */
  description: PropTypes.string,
  /**
   * Calback to be executed when the button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Indicates whether the button should be disabled (true) or not (false)
   */
  disabled: PropTypes.bool
};

export default Button;