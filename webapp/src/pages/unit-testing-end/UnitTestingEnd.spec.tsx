import {mount } from 'enzyme';
import UnitTestingEnd from './UnitTestingEnd';
import IntlProvider from '../../third-party/wrappers/i18n/IntlProvider';

describe('Unit testing end page', () => {
  test('render unit testing end page', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <UnitTestingEnd />
      </IntlProvider>
    );
    expect(wrapper.find('SceneContentManager').length).toBe(1);
  });
});