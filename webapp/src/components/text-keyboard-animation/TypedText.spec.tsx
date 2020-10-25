import { mount } from 'enzyme';
import TypedText from './TypedText';

describe('typed text component', () => {
  test('create component without text to animate', () => {
    const wrapper = mount(
      <TypedText />
    );
    wrapper.unmount();
  });

  test('should type string with keyboard animation', done => {
    const wrapper = mount(
      <TypedText
        strings={[
          'my text'
        ]}
      />
    );

    expect(wrapper.find('span').text()).toEqual('');

    setTimeout(() => {
      expect(wrapper.find('span').text()).toEqual('my text');
      wrapper.unmount();
      done();
    }, 1000);
  });
});
