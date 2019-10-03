import React from 'react';
import { mount } from 'enzyme';
import { Background } from './Background';

describe('Background component', () => {
  test('should mount children components', () => {
    const wrapper = mount(
      <Background>
        <h1>children</h1>
      </Background>
    );

    const h1 = wrapper.find('h1').text();

    expect(h1).toEqual('children');
  });

  test('should enable background animation', () => {
    const wrapper = mount(
      <Background options={{animation: true}}>
        <h1>children</h1>
      </Background>
    );

    expect(wrapper.find('.stars').length).toBe(1);
  });
});