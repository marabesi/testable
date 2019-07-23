/* eslint-disable react/display-name */
import * as React from 'react';

/**
 * @param {object} props
 */
export default props => {
  return (
    <h1 className="uppercase flex justify-between text-blue-lightest p-5 h-16" { ...props }>
      { props.children }
    </h1>
  );
};
