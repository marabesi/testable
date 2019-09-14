import React from 'react';
import { shallow } from 'enzyme';
import Rocket03 from './Rocket03';

describe('Rocket 02 page', () => {
  test('mount rocket 01 component', () => {
    const wrapper = shallow(<Rocket03 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});