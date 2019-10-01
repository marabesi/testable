import React from 'react';
import { mount } from 'enzyme';
import { Survey } from './Survey';
import { auth } from '../../pages/login/Auth';

describe('Survey page', () => {

  test('should show up message when survey url is not defined',() => {
    const wrapper = mount(<Survey user={{ uid: 'uhiuqwqw-k-woqk-wq--qw' }} />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Carregando questionário...');
  });

  test('should not load survey when user id is missing', () => {
    const wrapper = mount(<Survey user={{ }} />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Ocorreu um erro ao carregar o questionário');
  });
  test('load survey passing user id as a parameter in the query string', () => {
    const user = { uid: 'uhiuqwqw-k-woqk-wq--qw' };

    const wrapper = mount(<Survey user={user} />);
    const url = wrapper.find('iframe').prop('src');
    expect(url.includes(auth.user.uid)).toBe(true);
  });
});
