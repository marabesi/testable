import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { Sidebar } from './Sidebar';
import {Header} from '../header/Header';
import Logo from '../logo/Logo';
import Store from '../../store/store';

const store = Store();

describe('sidebar component', () => {

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
    const wrapper = shallow(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const sidebar = wrapper.find(Sidebar).dive();

    expect(sidebar.find('.sidebar').prop('className').includes('hidden')).toBeTruthy();

    sidebar.setState({
      open: true
    });

    expect(sidebar.find('.sidebar').prop('className').includes('block')).toBeTruthy();
  });

  test('should not show up logo when authenticated', () => {
    const wrapper = shallow(
      <Sidebar user={{ uid: 999 }} />
    );
    expect(wrapper.find(Logo).length).toBe(0);
  });
});