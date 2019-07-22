import React from 'react';
import { shallow } from 'enzyme';
import Tdd from './Tdd';

describe('Tutorial page', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Tdd />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});
