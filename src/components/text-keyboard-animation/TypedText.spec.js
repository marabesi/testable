import React from 'react';
import ReactDOM from 'react-dom';
import TypedText from './TypedText';

it('should prevent onComplete typeError when a function is not passed', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TypedText text="eita" />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
