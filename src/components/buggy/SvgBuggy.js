import * as React from 'react';
import Base64Image from '../base64image/Base64Image';

/**
 * @param {object} props
 */
const SvgBuggy = props => (
  <Base64Image image="testable.buggy.svg" alt="buggy" {...props}/>
);

export const SvgBuggyLeft = props => (
  <Base64Image image="testable.buggy.png" alt="buggy" {...props}/>
);

export const SvgBuggyBug = props => (
  <Base64Image image="testable.buggy-bug.svg" alt="buggy bug!!!" {...props}/>
);

export const SvgBuggySleepy = props => (
  <Base64Image image="testable.buggy-zzz.svg" alt="buggy zzz" {...props}/>
);

export default SvgBuggy;
