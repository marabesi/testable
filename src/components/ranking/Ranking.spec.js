import React from 'react';
import { mount } from 'enzyme';
import Ranking from './Ranking';

describe('Ranking component', () => {

  test('build ranking component title', () => {
    const wrapper = mount(<Ranking />);

    expect(wrapper.find('h1').text()).toEqual('Ranking');
  });

  test('should render ranking list', () => {
    const wrapper = mount(<Ranking />);

    wrapper.instance().setState({
      ranking: [
        { level: 1, name: 'Maria' },
      ]
    });
    wrapper.update();

    expect(wrapper.find('ul li').length).toEqual(1);
    expect(wrapper.find('ul li').text()).toEqual('Maria 1');
  });
});
