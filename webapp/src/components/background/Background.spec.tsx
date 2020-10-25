import { mount } from 'enzyme';
import Background, { Background as PureBackground } from './Background';
import { build, store } from '../../__test__/withReduxProvider';
import { ON_OPTIONS_UPDATED } from '../../actions/optionsAction';

describe('Background component', () => {
  test('should mount children components', () => {
    const wrapper = mount(
      <PureBackground>
        <h1>children</h1>
      </PureBackground>
    );

    const h1 = wrapper.find('h1').text();

    expect(h1).toEqual('children');
  });

  test('should enable PureBackground animation', () => {
    const wrapper = mount(
      <PureBackground options={{animation: true}}>
        <h1>children</h1>
      </PureBackground>
    );

    expect(wrapper.find('.stars').length).toBe(1);
  });

  describe('background component controlled via redux options', () => {
    test('should enable animation', () => {
      const PureBackgroundWithStore = build(Background);
      const wrapper = mount(PureBackgroundWithStore);

      store.dispatch({ type: ON_OPTIONS_UPDATED, payload: { animation: true }});

      wrapper.update();

      expect(wrapper.find('.stars').length).toBe(1);
    });
  });
});