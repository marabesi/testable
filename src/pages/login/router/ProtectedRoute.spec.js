import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { auth } from '../Auth';

describe('protected route component', () => {

  test('should render component when allowed', () => {
    auth.canEnter = (history, location) => {
      return {
        flag: true
      };
    };

    const MyComponent = props => {
      return (
        <h1>my component</h1>
      );
    };

    const wrapper = mount(
      <BrowserRouter>
        <ProtectedRoute
          component={MyComponent}
        />
      </BrowserRouter>
    );

    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('my component');
  });
});
