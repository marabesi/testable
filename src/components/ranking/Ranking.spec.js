import React from 'react';
import { mount } from 'enzyme';
import Ranking from './Ranking';

const mockedResponse = {
  data: [
    { name: 'john', level: 89 }
  ]
};

describe('Ranking component', () => {

  test('remove loading component once the data has been received from the api', done => {
    global.fetch = url => {
      return Promise.resolve(new Response(JSON.stringify(mockedResponse)));
    };
    const wrapper = mount(<Ranking />);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Loading').length).toBe(0);
      done();
    }, 500);
  });

  test('should show a friendly message if the data fetching fails', done => {
    global.fetch = url => {
      return Promise.reject('Something went wrong');
    };
    const wrapper = mount(<Ranking />);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Loading').length).toBe(0);
      expect(wrapper.find('h3').text()).toBe('Ocorreu um erro ao carregar o ranking :(');
      done();
    }, 500);
  });

  test('should render loading component by default', () => {
    const wrapper = mount(<Ranking />);
    expect(wrapper.find('Loading').length).toBe(1);
  });

  test('should render ranking list with one user', () => {
    const wrapper = mount(<Ranking />);

    wrapper.instance().setState({
      loading: false,
      ranking: [
        { level: 1, name: 'Maria' },
      ]
    });
    wrapper.update();

    expect(wrapper.find('ul li').length).toEqual(1);
    expect(wrapper.find('ul li').text()).toEqual('Maria 1');
  });
});
