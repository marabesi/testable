import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading component', () => {

  test('should render loading component', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.find('Load').length).toBe(1);
  });
});