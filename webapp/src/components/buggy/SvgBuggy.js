import React from 'react';
import Base64Image from '../base64image/Base64Image';

/**
 * @param {object} props
 */
const SvgBuggy = props => (
  <Base64Image image="testable.buggy-right.png" alt="buggy" {...props}/>
);

export const SvgBuggyLeft = props => (
  <Base64Image image="testable.buggy-left.png" alt="buggy" {...props}/>
);

export const SvgBuggyBug = props => (
  <Base64Image image="testable.buggy-bug.png" alt="buggy bug!!!" {...props}/>
);

export const SvgBuggySleepy = props => (
  <Base64Image image="testable.buggy-zzz.png" alt="buggy zzz" {...props}/>
);

export const SvgBuggyHappy = props => (
  <Base64Image image="testable.buggy-happy.png" alt="buggy happy" {...props}/>
);

export default SvgBuggy;
