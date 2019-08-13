import * as React from 'react';
import Base64Image from '../base64image/Base64Image';

/**
 * @param {object} props
 */
const SvgBuggy = props => (
  <Base64Image image="testable.buggy.svg" alt="buggy" {...props}/>
);
export default SvgBuggy;

export const SvgBuggyLeft = props => (
  <Base64Image image="testable.buggy.png" alt="buggy" {...props}/>
);

