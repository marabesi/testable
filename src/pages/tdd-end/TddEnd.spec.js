import React from 'react';
import { mount } from 'enzyme';
import { TddEnd } from './TddEnd';

describe('tdd end page', () => {

  test('render tdd end page', () => {
    const wrapper = mount(<TddEnd />);
    expect(wrapper.find('SceneManager').length).toBe(1);
  });
});