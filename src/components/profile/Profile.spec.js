import React from 'react';
import Profile from './Profile';
import { shallow } from 'enzyme';
import { auth } from '../../pages/login/Auth';

const userData = { name: 'fake user', email: 'fake@john.com' };

describe('profile component', () => {
  test('should place image from placeimg when user image does not exists', () => {
    const wrapper = shallow(<Profile user={{}} />);
    const imgSrc = wrapper.find('img');

    expect(imgSrc.prop('src')).toEqual('https://placeimg.com/200/200/any');
  });

  test('should place user image when it exists', () => {
    const wrapper = shallow(<Profile user={{ photo: 'my.photo.com'}} />);
    const imgSrc = wrapper.find('img');

    expect(imgSrc.prop('src')).toEqual('my.photo.com'); 
  });

  test('should have name and email on title property', () => {
    const wrapper = shallow(<Profile user={userData} />);
    const container = wrapper.find('div');

    expect(container.at(0).prop('title')).toEqual('fake user - fake@john.com'); 
  });

  test('should logout', () => {
    auth.signout = (cb) => { cb(); };
    const wrapper = shallow(
      <Profile
        className="menu-wrapper"
        user={userData}
      />
    );

    const container = wrapper.find('.menu-wrapper');

    container.at(0).simulate('click');
    wrapper.find('ul li').simulate('click');

    expect(wrapper.state().successfullLoggedOut).toBeTruthy();
    expect(wrapper.state().menu).toBeFalsy();
  });

  test('should close menu on blur', () => {
    const wrapper = shallow(
      <Profile
        className="menu-wrapper"
        user={userData}
      />
    );

    const container = wrapper.find('.menu-wrapper');

    expect(wrapper.state().menu).toBeFalsy();

    container.at(0).simulate('click');

    expect(wrapper.state().menu).toBeTruthy();

    container.simulate('click');

    expect(wrapper.state().menu).toBeFalsy();
  });

  test('should close menu invoking onBlur method', () => {
    const wrapper = shallow(
      <Profile
        className="menu-wrapper"
        user={userData}
      />
    );

    wrapper.instance().onBlur();

    expect(wrapper.state().menu).toBeFalsy();
  });
});
