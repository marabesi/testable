import { shallow } from 'enzyme';
import AchievementContainer from './AchievementContainer';
import Title from '../title/Title';

describe('AchievementContainer component: render behavior', () => {
  test('should render container title', () => {
    const wrapper = shallow(
      <AchievementContainer
        intl={{
          messages: {
            achievements: {
              title: 'Título',
              list: [],
              empty_list: 'A lista de conquista está vazia'
            }
          }
        }}
      />
    );
    expect(wrapper.find(Title).length).toEqual(1);
  });

  test('should show up empty message via props when there is no achievements', () => {
    const wrapper = shallow(
      <AchievementContainer
        intl={{
          messages: {
            achievements: {
              list: [],
              empty_list: 'A lista de conquista está vazia'
            }
          }
        }}
      />
    );

    expect(wrapper.find('span').text()).toEqual('A lista de conquista está vazia');
  });
});
