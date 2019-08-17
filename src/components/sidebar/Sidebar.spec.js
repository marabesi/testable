import React from 'react';
import {Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import { Sidebar } from './Sidebar';
import rootStore from '../../store/store';
import { setUser } from '../../actions/userAction';

const store = rootStore();

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
    store.dispatch(setUser({ uid: '123-123123-aaa'}));

    const wrapper = mount(
      <Provider store={store}>
        <Sidebar user={{ uid: '123-123123-aaa'}} />
      </Provider>
    );

    wrapper.find('Sidebar').instance().onSidebar();

    expect(wrapper.find('Header').exists()).toBeTruthy();
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