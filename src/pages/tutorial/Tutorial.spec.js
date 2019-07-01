import React from 'react';
import { shallow } from 'enzyme';
import { Tutorial } from './Tutorial';

describe('Tutorial page', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Tutorial />);

    expect(wrapper.find('Intro').length).toBe(1);
    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});
