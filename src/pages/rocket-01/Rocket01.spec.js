import React from 'react';
import { shallow } from 'enzyme';
import Rocket01 from './Rocket01';

describe('Rocket 01 page', () => {
  test('mount rocket 01 component', () => {
    const wrapper = shallow(<Rocket01 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });
});