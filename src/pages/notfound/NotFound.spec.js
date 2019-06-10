import React from 'react';
import NotFound from './NotFound';
import { shallow } from 'enzyme';

describe('not found page', () => {

  it('should display not found message', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.find('h1').text()).toEqual('Not found');
  });
});
