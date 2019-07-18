import React from 'react';
import { shallow } from 'enzyme';
import Tdd from './TddIntro';

describe('TDD intro page', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Tdd />);

    expect(wrapper.find('Intro').length).toBe(1);
    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});
