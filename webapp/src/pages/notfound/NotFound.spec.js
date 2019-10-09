import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('not found page', () => {

  it('should display not found message', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.find('h1').text()).toEqual('Página não encontrada!');
  });
});
