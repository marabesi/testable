//@ts-nocheck
import Base64Image from '../../../base64image/Base64Image';

const Buggy = props => (
  <Base64Image image="testable.buggy-right.png" alt="buggy" {...props}/>
);

export const BuggyLeft = props => (
  <Base64Image image="testable.buggy-left.png" alt="buggy" {...props}/>
);

export const BuggyBug = props => (
  <Base64Image image="testable.buggy-bug.png" alt="buggy bug!!!" {...props}/>
);

export const BuggySleepy = props => (
  <Base64Image image="testable.buggy-zzz.png" alt="buggy zzz" {...props}/>
);

export const BuggyHappy = props => (
  <Base64Image image="testable.buggy-happy.png" alt="buggy happy" {...props}/>
);

export const BuggyHappyLeft = props => (
  <Base64Image image="testable.buggy-happy-left.png" alt="buggy happy" {...props}/>
);

export const BuggyRocket = props => (
  <Base64Image image="testable.buggy-rocket.png" alt="buggy rocket" {...props}/>
);

export default Buggy;
