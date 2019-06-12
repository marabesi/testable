import React from 'react';
import Loading from './Loading';
import { shallow } from 'enzyme';

describe('Loading component', () => {

  test('should render loading component', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.find('h1').text()).toContain('Loading');
  });
});