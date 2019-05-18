import React from 'react';
import Background from './Background';
import { mount } from 'enzyme';

describe('Background component', () => {
  it('should mount children components', () => {
    const wrapper = mount(
      <Background>
        <h1>children</h1>
      </Background>
    );

    const h1 = wrapper.find('h1').text();

    expect(h1).toEqual('children');
  });
});