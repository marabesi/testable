import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('Scene component', () => {
  test('should render button', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find('button').length).toBe(1);
  });

  test('should fire click event', () => {
    const click = jest.fn();
    const wrapper = mount(<Button onClick={click} />);

    wrapper.find('button').simulate('click');

    expect(click).toBeCalled();
  });

  test('pass in custom class', () => {
    const wrapper = mount(<Button className="custom-test" />);
    const button = wrapper.find('button.custom-test');

    expect(button.length).toBe(1);
  });

  test('pass in description', () => {
    const wrapper = mount(<Button description="my button" />);
    const button = wrapper.find('button');

    expect(button.html().match(/my button/).length).toBe(1);
  });

  test('should disable button via props', () => {
    const wrapper = mount(<Button disabled={true} />);
    const button = wrapper.find('button');

    expect(button.props().disabled).toBeTruthy();
  });

  test('should not be disabled by default', () => {
    const wrapper = mount(<Button />);
    const button = wrapper.find('button');

    expect(button.props().disabled).toBeFalsy();
  });
});