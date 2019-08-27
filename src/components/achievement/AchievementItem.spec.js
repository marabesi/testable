import React from 'react';
import { mount } from 'enzyme';
import AchievementItem from './AchievementItem';

describe('Achievement item behavior', () => {

  it('should render achievement title', () => {
    const wrapper = mount(
      <AchievementItem
        title={'Desafio aceito'}
      />
    );

    expect(wrapper.find('ul h3').text()).toEqual('Desafio aceito');
  });
});