import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { AchievementList } from './AchievementList';
import { User } from '../../../../packages/types/User';
import { makeUser } from '../../../../__test__/fakes/user';

const BuildComponent = props =>
  <IntlProvider locale={'en'}>
    <AchievementList {...props}/>
  </IntlProvider>;

const user: User = makeUser();

describe('AchievementList component: behavior based on the user level', () => {
  test('should not show achievement with higher level than the user', () => {
    render(
      <AchievementList
        user={user}
        achievements={[
          {
            title: 'Desafio aceito',
            description: 'Vamos construir um foguete!' ,
            level: 2,
            active: true,
            items: [],
            onClick: () => {},
            intl: {},
          },
        ]}
      />
    );

    expect(screen.queryByText('Desafio aceito')).toBeNull();
    expect(screen.queryByText('level 2')).toBeNull();
  });

  test('should render achievements with lower level than the user', () => {
    render(
      <BuildComponent
        user={user}
        achievements={[
          {
            title: 'my title',
            description: 'my desc',
            level: 0,
          },
        ]}
      />
    );

    screen.getByText('my title');
    screen.getByText('my desc');
  });
});

describe('default AchievementList behavior', () => {

  test('should render friendly message when the list is empty', () => {
    render(
      <BuildComponent
        achievements={[]}
        intl={{
          messages: {
            achievements: {
              empty_list: 'Você não possui nenhuma conquista até o momento'
            }
          }
        }}
        user={{ level: 1 }}
      />
    );

    screen.getByText('Você não possui nenhuma conquista até o momento');
  });

  test('should set item to active to true (show up the item description)', () => {
    render(
      <BuildComponent
        user={user}
        achievements={[
          {
            title: 'my title',
            description: 'my desc',
            level: 0,
          },
        ]}
      />
    );

    act(() => {
      const achievement= screen.queryByText('my title');
      achievement?.click();
    });

    screen.queryByText('my title')?.classList.contains('hidden');
  });
});
