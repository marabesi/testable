import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';

describe('modal component', () => {
  test('should display modal title', () => {
    const wrapper = mount(<Modal title={'modal title'} isOpen={true} />);
    expect(wrapper.find('h1').text()).toEqual('modal title');
  });

  test('should close modal', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Modal
        title={'modal title'}
        isOpen={true}
        onClose={onClose}
      />
    );
    wrapper.find('svg').simulate('click');
    expect(onClose).toBeCalled();
  });

  test('should render children', () => {
    const wrapper = mount(
      <Modal
        title={'modal title'}
        isOpen={true}
      >
        <h4>child</h4>
      </Modal>
    );
    expect(wrapper.find('h4').text()).toEqual('child');
  });
});