import React from 'react';
import Editor from './Editor';
import { shallow } from 'enzyme';

describe('Editor component', () => {
  // it('should emit event when the code changes', () => {

  // });

  it('should accept class as prop', () => {
    const wrapper = shallow(<Editor className="my-editor" />);
    expect(wrapper.find('.my-editor').length).toEqual(1);
  });
});