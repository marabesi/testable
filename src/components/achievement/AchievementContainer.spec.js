import React from 'react';
import { shallow } from 'enzyme';
import AchievementContainer from './AchievementContainer';
import Title from '../title/Title';

describe('AchievementContainer component: render behavior', () => {
  it('should render container title', () => {
    const wrapper = shallow(<AchievementContainer />);
    wrapper.setState({
      achievements: []
    });
    expect(wrapper.find(Title).length).toEqual(1);
  });

  it('should show up empty message when there is no achievements', () => {
    const wrapper = shallow(<AchievementContainer />);
    wrapper.setState({
      achievements: []
    });

    expect(wrapper.find('span').text()).toEqual('A lista de conquista está vazia');
  });
});