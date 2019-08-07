import React from 'react';
import { mount } from 'enzyme';
import UserMenu from './UserMenu';

describe('UserMenu component', () => {

  test('Ranking modal closed by default', () => {
    const wrapper = mount(<UserMenu />);

    expect(wrapper.find('Modal').at(0).prop('isOpen')).toBeFalsy();
  });

  test('open ranking modal', () => {
    const wrapper = mount(<UserMenu />);

    wrapper.find('svg').at(0).simulate('click');

    expect(wrapper.find('Modal').at(0).prop('isOpen')).toBeTruthy();
  });
});
