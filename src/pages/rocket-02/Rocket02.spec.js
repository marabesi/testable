import React from 'react';
import { shallow } from 'enzyme';
import Rocket02 from './Rocket02';

describe('Rocket 02 page', () => {
  test('mount rocket 02 component', () => {
    const wrapper = shallow(<Rocket02 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});