import {mount } from 'enzyme';
import UnitTestingEnd from './UnitTestingEnd';

describe('Unit testing end page', () => {
  test('render unit testing end page', () => {
    const wrapper = mount(<UnitTestingEnd />);
    expect(wrapper.find('SceneContentManager').length).toBe(1);
  });
});