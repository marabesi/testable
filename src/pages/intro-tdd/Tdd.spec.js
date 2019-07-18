import React from 'react';
import { shallow } from 'enzyme';
import Tdd from './IntroTdd';

describe('Tutorial page', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Tdd />);

    expect(wrapper.find('Intro').length).toBe(1);
    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});
