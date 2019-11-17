//@ts-nocheck
import React from 'react';
import { shallow } from 'enzyme';
import { AchievementList } from './AchievementList';
import { AchievementItem } from './AchievementItem';

describe('AchievementList component: behavior based on the user level', () => {
  test('should not show achievement with higher level than the user', () => {
    const wrapper = shallow(
      <AchievementList
        user={{ level: 1 }}
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

    expect(wrapper.find(AchievementItem).length).toEqual(0);
  });
});

describe('default AchievementList behavior', () => {
  test('should render achievements via achievements prop', () => {
    const wrapper = shallow(
      <AchievementList
        user={{ level: 1 }}
        achievements={[
          {
            title: 'my title',
            description: 'my desc',
            level: 0,
          },
        ]}
      />
    );
  
    expect(wrapper.children().length).toEqual(1);
  });

  test('should render friendly when the list is empty', () => {
    const msg = 'Você não possui nenhuma conquista até o momento';
    const wrapper = shallow(
      <AchievementList
        intl={{
          messages: {
            achievements: {
              empty_list: 'Você não possui nenhuma conquista até o momento'
            }
          }
        }}
        user={{ level: 1 }}
      />);
    expect(wrapper.find('span').text()).toEqual(msg);
    expect(wrapper.find('ul').length).toBe(0);
  });

  test('should set item to active to true (show up the item description)', () => {
    const wrapper = shallow(
      <AchievementList
        user={{ level: 1 }}
        achievements={[
          {
            title: 'my title',
            description: 'my desc',
            level: 0,
          },
        ]}
      />
    );

    wrapper.instance().showAchievement(0);

    expect(wrapper.instance().state.achievements[0].active).toBeTruthy();
  });
});