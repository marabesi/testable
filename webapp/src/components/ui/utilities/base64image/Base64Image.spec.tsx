import { vitest } from 'vitest';
import { mount } from 'enzyme';
import Base64Image from './Base64Image';
import Emitter, { TRACKING } from '../../../../packages/emitter/Emitter';

describe('base64image behavior', () => {
  afterEach(() => {
    Emitter.removeAllListeners(TRACKING);
  });

  test('emit track event on click', () => {
    const listener = vitest.fn();
    Emitter.addListener(TRACKING, listener);
    const wrapper = mount(<Base64Image />);
    wrapper.find('img').simulate('click');
    expect(listener).toBeCalled();
  });
});
