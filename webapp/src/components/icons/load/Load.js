import * as React from 'react';

import './load.scss';

/**
 * @param {object} props
 */
const Load = props => {
  return (
    <div className="absolute loading flex justify-center items-center" {...props} />
  );
};

export default Load;