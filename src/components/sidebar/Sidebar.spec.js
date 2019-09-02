import React from 'react';
import { shallow, mount } from 'enzyme';
import { Sidebar } from './Sidebar';
import {Header} from '../header/Header';

describe('sidebar component', () => {

  test('should render loading spinner based on loading prop', () => {
    const wrapper = shallow(<Sidebar loading={true} />);
    expect(wrapper.find('Loading').length).toBe(1);
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
    const wrapper = shallow(
      <Sidebar loading={false} user={{ uid: '123-123123-aaa'}} />
    );
    expect(wrapper.find(<Header />)).toBeTruthy();
  });

  test('should toggle sidebar', () => {
    const wrapper = mount(<Sidebar />);

    expect(wrapper.find('.sidebar').prop('className').includes('hidden')).toBeTruthy();

    wrapper.setState({
      open: true
    });

    expect(wrapper.find('.sidebar').prop('className').includes('block')).toBeTruthy();
  });

  test('should not show up logo when authenticated', () => {
    const wrapper = shallow(
      <Sidebar user={{}} />
    );
    expect(wrapper.find('Logo').length).toBe(0);
  });
});