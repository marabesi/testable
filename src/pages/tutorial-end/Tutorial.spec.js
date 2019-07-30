import React from 'react';
import { mount } from 'enzyme';
import { TutorialEnd } from './TutorialEnd';

describe('TutorialEnd page', () => {
  test('render without crashing', () => {
    const wrapper = mount(<TutorialEnd />);

    expect(wrapper.find('SceneManager').length).toBe(1);
  });
});
