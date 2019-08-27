import React from 'react';
import { mount } from 'enzyme';
import AchievementList from './AchievementList';
import { auth } from '../../pages/login/Auth';

describe('AchievementList component: behavior based on the user level', () => {
  beforeEach(() => {
    auth.user.level = 1;
  });

  it('should not show achievement with higher level than the user', () => {
    const wrapper = mount(
      <AchievementList
        achievements={[
          {
            title: 'Desafio aceito',
            description: [
              'Vamos construir um foguete!'
            ],
            level: 2,
          },
        ]}
      />
    );

    expect(wrapper.find('AchievementItem').length).toEqual(0);
  });
});

describe('default AchievementList behavior', () => {
  it('should render achievements via achievements prop', () => {
    const wrapper = mount(
      <AchievementList
        achievements={[
          {
            title: 'my title',
            description: 'my desc',
            level: 0,
          }
        ]}
      />
    );
  
    expect(wrapper.find('ul h3').text()).toEqual('my title');
    expect(wrapper.find('ul li span').text()).toEqual('my desc');
  });

  it('should render achievement description once clicked', () => {
    const wrapper = mount(
      <AchievementList
        achievements={[
          {
            title: 'my title',
            description: 'Vamos construir um foguete!',
            level: 0,
          }
        ]}
      />
    );

    expect((wrapper.find('ul h3 + li').prop('className') || []).includes('hidden')).toBeTruthy();

    wrapper.find('ul h3').simulate('click');

    expect((wrapper.find('ul h3 + li').prop('className') || []).includes('hidden')).toBeFalsy();
    expect(wrapper.find('ul h3 + li').text()).toEqual('Vamos construir um foguete!');
  });
});