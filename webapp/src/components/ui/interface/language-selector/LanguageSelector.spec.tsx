import { vitest } from 'vitest';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import LanguageSelector from './LanguageSelector';
import { LanguageSelector as LanguageSelectorWithoutStore } from './LanguageSelector';
import { SET_LOCALE } from '../../../../data-flow/redux/actions/localeAction';

const mockStore = configureMockStore();

describe('language selector component', () => {

  test('should show up select to chose the desired language', () => {
    const wrapper = shallow(<LanguageSelectorWithoutStore />);
    expect(wrapper.find('select').exists()).toBeTruthy();
  });

  test('Portuguese should be the language by default', () => {
    const wrapper = shallow(<LanguageSelectorWithoutStore />);
    expect(wrapper.find('select').props().value).toEqual('pt-br');
  });

  test('switch Portuguese to English', () => {
    const setLocale = vitest.fn();
    const wrapper = shallow(<LanguageSelectorWithoutStore setLocale={setLocale} />);

    wrapper.find('select').simulate('change', { target: { value: 'en' } });

    expect(setLocale).toBeCalledWith('en');
  });

  test('should trigger onChange when switch language', () => {
    const onChange = vitest.fn();
    const wrapper = shallow(
      <LanguageSelectorWithoutStore
        setLocale={vitest.fn()}
        onChange={onChange}
      />
    );

    wrapper.find('select').simulate('change', { target: { value: 'en' } });

    expect(onChange).toBeCalledWith('en');
  });

  test('dispatch action on change selected language', () => {
    const store = mockStore({
      optionsReducer: {
        LanguageSelector: {}
      },
      localeReducer: {
        locale: 'en'
      }
    });
    const wrapper = mount(
      <IntlProvider locale={'en'} messages={{
        options: {
          languages: {}
        },
        global: {},
      }}>
        <LanguageSelector store={store} />
      </IntlProvider>
    );

    wrapper.find('select').simulate('change', { target: { value: 'pt-br' } });
    const actions = store.getActions();

    expect(actions).toEqual([{ 'payload': 'pt-br', 'type': SET_LOCALE }]);
  });
});
