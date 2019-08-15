import React from 'react';
import { shallow, mount } from 'enzyme';
import Profile from './Profile';
import { auth } from '../../pages/login/Auth';
import PlaceholderImage from '../../components/profile/PlaceholderImage';

const userData = { name: 'fake user', email: 'fake@john.com' };

describe('profile component', () => {
  test('should place image placeholder when user image does not exists', () => {
    const wrapper = mount(<Profile user={{}} />);

    expect(wrapper.find(PlaceholderImage).length).toEqual(1);
  });

  test('should place user image when it exists', () => {
    const wrapper = shallow(<Profile user={{}} />);
    wrapper.setState({
      photo: 'my.photo.com'
    });

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
    wrapper.find('ul li').at(0).simulate('click');

    expect(wrapper.state().successfullLoggedOut).toBeTruthy();
    expect(wrapper.state().menu).toBeFalsy();
  });

  describe('options modal behavior', () => {
    test('modal should be closed by default', () => {
      const wrapper = shallow(
        <Profile
          className="menu-wrapper"
          user={userData}
        />
      );

      expect(wrapper.find('Modal').length).toBe(0);
    });

    test('should not open modal clicking on the user photo (user menu)', () => {
      const wrapper = shallow(
        <Profile
          className="menu-wrapper"
          user={userData}
        />
      );

      const container = wrapper.find('.menu-wrapper');

      container.at(0).simulate('click');
      wrapper.update();
      expect(wrapper.find('Modal').length).toBe(0);
    });

    test('should open up modal when click on options', () => {
      const wrapper = shallow(
        <Profile
          className="menu-wrapper"
          user={userData}
        />
      );

      const container = wrapper.find('.menu-wrapper');

      container.at(0).simulate('click');
      wrapper.find('ul li').at(1).simulate('click');
      wrapper.update();
      expect(wrapper.find('Modal').length).toBe(1);
    });
  });

  test('should close user menu on blur', () => {
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

  test('should close user menu invoking onBlur method', () => {
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
