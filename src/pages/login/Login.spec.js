import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './Login';

describe('Login page behavior', () => {
  it('should load firebase container', () => {
    const wrapper = mount(<Login />);

    expect(wrapper.find('#firebaseui-auth-container').length).toBe(1);
  });

  describe('user logged in already', () => {
    let loggedWrapper = null;

    beforeEach(() => {
      loggedWrapper = shallow(
        <BrowserRouter>
          <Login
            onLoading={() => true}
            setUser={() => {}}
          />
        </BrowserRouter>
      );
    });

    afterAll(() => {
      loggedWrapper = null;
    });

    it('should redirect if already logged in', () => {
      const login = loggedWrapper.find('Login').dive();
      login.setState({
        user: {
          email: 'user@user.com'
        },
      });
  
      expect(login.find('Redirect').length).toBe(1);
    });
  
    it('should fill in logged user data', () => {
      const login = loggedWrapper.find('Login').dive();
      login.instance().authStatusChanged({ email: 'test@test.com' });
  
      expect(login.instance().state.user.email).toEqual('test@test.com');
    });
  });
});

