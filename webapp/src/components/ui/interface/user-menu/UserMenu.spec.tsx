import {shallow} from 'enzyme';
import {UserMenu} from './UserMenu';
import Cup from '../../icons/Cup';
import Button from '../../buttons/primary/Primary';

const mockedUser = {
  level: 3,
  progress: 9
};

describe('UserMenu component', () => {

  test('Ranking modal closed by default', () => {
    const wrapper = shallow(<UserMenu user={mockedUser} />);
    expect(wrapper.find('Modal').at(0).prop('isOpen')).toBeFalsy();
  });

  test('open ranking modal', () => {
    const wrapper = shallow(<UserMenu user={mockedUser} />);
    wrapper.instance()['onRanking']();
    expect(wrapper.find('Modal').at(0).prop('isOpen')).toBeTruthy();
  });

  test('should render cup icon', () => {
    const wrapper = shallow(<UserMenu user={mockedUser} />);
    expect(wrapper.find(Cup).length).toBe(1);
  });

  test('should not show up survey button on level 14', () => {
    const wrapper = shallow(<UserMenu user={{ level: 14 }}/>);
    expect(wrapper.find(Button).length).toBe(0);
  });

  test('should show up survey button by default', () => {
    const wrapper = shallow(<UserMenu user={{ level: 1 }} showUpSurvey={true} />);
    expect(wrapper.find(Button).length).toBe(1);
  });

  test('should not show up survey button if flag is false', () => {
    const wrapper = shallow(<UserMenu user={{ level: 1 }} showUpSurvey={false} />);
    expect(wrapper.find(Button).length).toBe(0);
  });
});
