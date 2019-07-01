import React from 'react';
import Login from './Login';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

describe('Login page behavior', () => {

  it('should show up loading by default', () => {

    const wrapper = mount(<Login />);

    expect(wrapper.find('Loading').length).toBe(1);
  });

  it('should load firebase container', () => {
    const wrapper = mount(<Login />);

    wrapper.setState({
      loading: false
    });

    expect(wrapper.find('#firebaseui-auth-container').length).toBe(1);
  });

  it('should redirect if already logged in', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const login = wrapper.find('Login').dive();
    login.setState({
      logged: true,
    });

    expect(login.find('Redirect').length).toBe(1);
  });

  it('should fill in logged user data', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const login = wrapper.find('Login').dive();
    login.instance().authStatusChanged({ email: 'test@test.com' });

    expect(login.instance().state.user.email).toEqual('test@test.com');
  });
});

