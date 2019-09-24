import React from 'react';
import { shallow } from 'enzyme';
import Challenge03_01 from './Challenge03_01';

describe('Challenge 03_01 page', () => {
  test('mount Challenge 03 01 component', () => {
    const wrapper = shallow(<Challenge03_01 />);

    expect(wrapper.find('SceneManager').length).toBe(1);
  });
});