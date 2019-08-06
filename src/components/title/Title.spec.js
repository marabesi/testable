import React from 'react';
import { mount } from 'enzyme';
import Title from './Title';

describe('title component', () => {
  test('should render title as a string', () => {
    const wrapper = mount(
      <Title>
        my title
      </Title>
    );
    expect(wrapper.find('h1').text()).toEqual('my title');
  });

  test('should render title with raw html elements', () => {
    const wrapper = mount(
      <Title>
        <div>my title</div>
      </Title>
    );
    expect(wrapper.find('div').text()).toEqual('my title');
  });
});
