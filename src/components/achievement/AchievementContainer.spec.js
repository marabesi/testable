import React from 'react';
import { mount } from 'enzyme';
import AchievementContainer from './AchievementContainer';

describe('AchievementContainer component: render behavior', () => {
  it('should render container title', () => {
    const wrapper = mount(<AchievementContainer />);
    wrapper.setState({
      achievements: []
    });
    expect(wrapper.find('h1').text()).toEqual('Conquistas');
  });

  it('should show up empty message when there is no achievements', () => {
    const wrapper = mount(<AchievementContainer />);
    wrapper.setState({
      achievements: []
    });

    expect(wrapper.find('span').text()).toEqual('A lista de conquista está vazia');
  });
});