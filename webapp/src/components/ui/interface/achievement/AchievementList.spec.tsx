import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { AchievementList } from './AchievementList';
import { AchievementItem } from './AchievementItem';
import { messages } from '../../../../constants/locale';

const BuildComponent = props => 
  <IntlProvider locale={'en'} messages={messages.en}>
    <AchievementList {...props}/>
  </IntlProvider>;

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

  test('should render achievements with lower level than the user', () => {
    const wrapper = mount(
      <BuildComponent
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

    expect(wrapper.find(AchievementItem).length).toEqual(1);
  });
});

describe('default AchievementList behavior', () => {

  test('should render friendly message when the list is empty', () => {
    const msg = 'Você não possui nenhuma conquista até o momento';
    const wrapper = mount(
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
    expect(wrapper.find('span').text()).toEqual(msg);
  });

  test('should set item to active to true (show up the item description)', () => {
    const wrapper = mount(
      <BuildComponent
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

    expect(wrapper.find(AchievementItem).prop('active')).toBeFalsy();

    act(() => {
      wrapper.find(AchievementItem).props().onClick();
    });

    wrapper.update();

    expect(wrapper.find(AchievementItem).props().active).toBeTruthy();
  });
});