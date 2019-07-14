import React from 'react';
import { mount } from 'enzyme';
import Completed from './Completed';

describe('Completed page', () => {

  test('render completed page', () => {
    const wrapper = mount(<Completed />);
    expect(wrapper.find('SceneManager').length).toBe(1);
  });
});