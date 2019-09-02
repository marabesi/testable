import React from 'react';
import {shallow} from 'enzyme';
import { Options } from './Options';

describe('options menu component', () => {

  test('should show up select to chose the desired language', () => {
    const wrapper = shallow(<Options />);
    expect(wrapper.find('select').exists()).toBeTruthy();
  });

  test('Portuguese should be the language by default', () => {
    const wrapper = shallow(<Options />);
    expect(wrapper.find('select').props().value).toEqual('pt-br');
  });

  test('switch Portuguese to English', () => {
    const setLocale = jest.fn();
    const wrapper = shallow(<Options setLocale={setLocale} />);

    wrapper.find('select').simulate('change', {target: { value : 'en'}});

    expect(setLocale).toBeCalledWith('en');
  });
});