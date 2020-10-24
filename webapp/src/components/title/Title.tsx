//@ts-nocheck
import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 */
const Title = props => {
  return (
    <h1 className="uppercase flex justify-between items-center text-blue-lightest p-5 h-16" { ...props }>
      { props.children }
    </h1>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;