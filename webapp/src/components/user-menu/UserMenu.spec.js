import React from 'react';
import {shallow} from 'enzyme';
import {UserMenu} from './UserMenu';
import Cup from '../icons/Cup';
import Button from '../../components/scene-manager/Button';

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

  test('should render cup icon', () => {
    const wrapper = shallow(<UserMenu />);
    expect(wrapper.find(Cup).length).toBe(1);
  });

  test('should not show up survey button on level 14', () => {
    const wrapper = shallow(<UserMenu user={{ level: 14 }}/>);
    expect(wrapper.find(Button).length).toBe(0);
  });

  test('should show up survey button by default', () => {
    const wrapper = shallow(<UserMenu user={{ level: 1 }}/>);
    expect(wrapper.find(Button).length).toBe(0);
  });
});
