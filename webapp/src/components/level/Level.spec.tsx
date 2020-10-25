import { shallow } from 'enzyme';
import { Level } from './Level';
import Emitter, { TRACKING } from '../../emitter/Emitter';

describe('Level component', () => {

  afterEach(() => {
    Emitter.removeAllListeners(TRACKING);
  });

  test('should render user level', () => {
    const wrapper = shallow(<Level level={2} />);
    const level = wrapper.find('h1').text();

    expect(level.trim()).toBe('2');
  });

  test('should add label alongside user level', () => {
    const wrapper = shallow(<Level level={2} intl={{messages: { level: {label: 'my label'}}}} />);
    const level = wrapper.find('h1').text();

    expect(level).toBe('my label 2');
  });

  test('should track on click', () => {
    const callback = jest.fn();
    Emitter.addListener(TRACKING, callback);
    const wrapper = shallow(<Level level={2} />);
    wrapper.find('.py-3').simulate('click');
    expect(callback).toBeCalled();
  });

  describe.each([[10], [20], [30], [40], [50], [60], [70], [80], [90], [100]])(
    'user progress bar',
    (progress) => {
      test('should render user progress through css class (progress: %i)',() => {
        const wrapper = shallow(<Level progress={progress} />);
        expect(wrapper.find(`.progress-${progress}`).length).toEqual(1);
      });

      test('should render user progress in percentage (progress: %i)',() => {
        const wrapper = shallow(<Level progress={progress} />);
        expect(wrapper.find(`[title="${progress} %"]`).length).toEqual(1);
      });
    }
  );
});
