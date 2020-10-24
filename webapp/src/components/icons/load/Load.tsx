//@ts-nocheck
import * as React from 'react';

import './load.scss';

const Load = props => {
  return (
    <div className="absolute loading flex justify-center items-center" {...props} />
  );
};

export default Load;