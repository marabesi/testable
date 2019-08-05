import React from 'react';
import { shallow } from 'enzyme';
import TddIntro from './TddIntro';

describe('TDD intro page', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<TddIntro />);

    expect(wrapper.find('Intro').length).toBe(1);
    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});
