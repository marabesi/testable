import React from 'react';
import { shallow, mount } from 'enzyme';
import { Sidebar } from './Sidebar';
import { auth } from '../../pages/login/Auth';

describe('sidebar component', () => {

  afterEach(() => {
    auth.isAuthenticated = false;
  });

  test('should be hidden by default', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.find('.z-50').hasClass('hidden')).toBeTruthy();
  });

  test('display sidebar on toggle', () => {
    const wrapper = shallow(<Sidebar />);

    wrapper.instance().onSidebar();

    expect(wrapper.find('.z-50').hasClass('hidden')).toBeFalsy();
  });

  test('display overlay on sidebar toggle', () => {
    const wrapper = shallow(<Sidebar />);

    wrapper.instance().onSidebar();

    expect(wrapper.find('.bg-testable-overlay-sidebar').exists()).toBeTruthy();
  });

  test('should display header if the user is logged', () => {
    auth.isAuthenticated = true;
    const wrapper = mount(<Sidebar user={{ uid: '123-123123-aaa'}} />);

    wrapper.instance().onSidebar();

    expect(wrapper.find('Header').exists()).toBeTruthy();
  });

  test('should toggle sidebar', () => {
    auth.isAuthenticated = true;
    const wrapper = mount(<Sidebar />);

    expect(wrapper.find('.sidebar').prop('className').includes('hidden')).toBeTruthy();

    wrapper.setState({
      open: true
    });

    expect(wrapper.find('.sidebar').prop('className').includes('block')).toBeTruthy();
  });

  test('should not show up logo when authenticated', () => {
    auth.isAuthenticated = true;
    const wrapper = mount(<Sidebar user={{ uid: '123-123123-aaa'}} />);

    expect(wrapper.find('Logo').length).toBe(0)
  });
});