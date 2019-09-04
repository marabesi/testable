import React from 'react';
import {shallow} from 'enzyme';
import UserMenu from './UserMenu';
import Achievement from '../icons/Achievement';
import Cup from '../icons/Cup';

describe('UserMenu component', () => {

  test('Ranking modal closed by default', () => {
    const wrapper = shallow(<UserMenu />);
    expect(wrapper.find('Modal').at(0).prop('isOpen')).toBeFalsy();
  });

  test('open ranking modal', () => {
    const wrapper = shallow(<UserMenu />);
    wrapper.instance()['onRanking']();
    expect(wrapper.find('Modal').at(0).prop('isOpen')).toBeTruthy();
  });

  test('should render achievement icon', () => {
    const wrapper = shallow(<UserMenu />);
    expect(wrapper.find(Achievement).length).toBe(1);
  });

  test('should render cup icon', () => {
    const wrapper = shallow(<UserMenu />);
    expect(wrapper.find(Cup).length).toBe(1);
  });
});
