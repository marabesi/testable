import React from 'react';
import { mount } from 'enzyme';
import Ranking from './Ranking';

describe('Ranking component', () => {

  test('build ranking component title', () => {
    const wrapper = mount(<Ranking />);

    expect(wrapper.find('h1').text()).toEqual('Ranking');
  });
});
