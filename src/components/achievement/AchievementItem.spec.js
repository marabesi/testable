import React from 'react';
import { mount } from 'enzyme';
import AchievementItem from './AchievementItem';

describe('Achievement item behavior', () => {

  it('should render achievement title', () => {
    const wrapper = mount(
      <AchievementItem
        title="Desafio aceito"
      />
    );

    expect(wrapper.find('ul h3').text()).toEqual('Desafio aceito');
  });

  it('should render achievement description', () => {
    const wrapper = mount(
      <AchievementItem
        description="desc"
      />
    );

    expect(wrapper.find('li span').text()).toEqual('desc');
  });

  it('propagate on click event to be handled', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <AchievementItem
        title="achiv title"
        onClick={callback}
      />
    );
    wrapper.find('h3').simulate('click');
    expect(callback).toBeCalled();
  });

  it('description should not show up by default', () => {
    const wrapper = mount(
      <AchievementItem
        title="achiv title"
        description="my description"
      />
    );
    expect(wrapper.find('h3 + li').prop('className')).toContain('hidden');
  });
});