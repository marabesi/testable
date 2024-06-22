import { mount } from 'enzyme';
import Intro from './Intro';
import IntlProvider from '../../../../third-party/wrappers/i18n/IntlProvider';

describe('Intro component', () => {

  describe('default options', () => {
    test('should not exit on esc', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <Intro
            initialStep={0}
            steps={[]}
            onExit={()=> {}}
          />
        </IntlProvider>
      );

      const options = wrapper.find('Steps').props('options');

      expect(options.exitOnEsc).toBeFalsy();
    });

    test('should not exit on overlay click', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <Intro
            initialStep={0}
            steps={[]}
            onExit={()=> {}}
          />
        </IntlProvider>
      );

      const options = wrapper.find('Steps').props('options');

      expect(options.exitOnOverlayClick).toBeFalsy();
    });
  });
});
