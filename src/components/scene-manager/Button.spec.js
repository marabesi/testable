import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('Scene component', () => {
  test('should render button', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find('button').length).toBe(1);
  });
});