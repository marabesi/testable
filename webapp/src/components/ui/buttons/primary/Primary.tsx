//@ts-nocheck
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { get } from 'lodash';

import './primary.scss';

const Primary = props =>  {
  const { messages } = useIntl();
  const { onClick, description, className, disabled } = props;
  const fullClassName = `button hover:bg-testable-pink-dark focus:outline-none ${className ? className: ''}`;

  return (
    <button className={fullClassName} onClick={onClick} disabled={disabled}>
      {get(messages, description, description)}
    </button>
  );
};

Primary.propTypes = {
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

export default Primary;
