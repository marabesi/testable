import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './Login';

const buildComponent = (props) => {
  return shallow(
    <BrowserRouter>
      <Login
        {...props}
      />
    </BrowserRouter>
  );
};

describe('Login page behavior', () => {
  test('should load firebase container', () => {
    const wrapper = mount(<Login />);

    expect(wrapper.find('#firebaseui-auth-container').length).toBe(1);
  });

  describe('user logged in already', () => {
    test('should redirect if already logged in', () => {
      const login = buildComponent({
        onLoading: () => {},
        setUser: () => {},
        user: { uid: 999 }
      }).find('Login').dive();
  
      expect(login.find('Redirect').length).toBe(1);
    });
  
    test('should fill in logged user data', () => {
      const setUser = jest.fn();
      const login = buildComponent({ setUser}).find('Login').dive();
      login.instance().authStatusChanged({ email: 'test@test.com' });
  
      expect(setUser).toBeCalledWith({ email: 'test@test.com' });
    });
  });
});

