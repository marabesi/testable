import React from 'react';
import {shallow, mount} from 'enzyme';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import Options from './Options';
import { Options as OptionsWithoutStore } from './Options';
import { SET_LOCALE } from '../../actions/localeAction';

const mockStore = configureMockStore();

describe('options menu component', () => {

  test('should show up select to chose the desired language', () => {
    const wrapper = shallow(<OptionsWithoutStore />);
    expect(wrapper.find('select').exists()).toBeTruthy();
  });

  test('Portuguese should be the language by default', () => {
    const wrapper = shallow(<OptionsWithoutStore />);
    expect(wrapper.find('select').props().value).toEqual('pt-br');
  });

  test('switch Portuguese to English', () => {
    const setLocale = jest.fn();
    const wrapper = shallow(<OptionsWithoutStore setLocale={setLocale} />);

    wrapper.find('select').simulate('change', {target: { value : 'en'}});

    expect(setLocale).toBeCalledWith('en');
  });

  test('dispatch action on change selected language', () => {
    const store = mockStore({
      optionsReducer: {
        options: {}
      }
    });
    const wrapper = mount(
      <IntlProvider locale={'en'}>
        <Options store={store} />
      </IntlProvider>
    );

    wrapper.find('select').simulate('change', {target: { value : 'pt-br'}});
    const actions = store.getActions();

    expect(actions).toEqual([ { 'payload': 'pt-br', 'type': SET_LOCALE } ]);
  });
});