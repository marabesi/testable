import Button from './Primary';
import {mountApp} from "../../../../__test__/mount";

describe('Scene component', () => {
  test('should render button', () => {
    const wrapper = mountApp(<Button />);
    expect(wrapper.find('button').length).toBe(1);
  });

  test('should fire click event', () => {
    const click = jest.fn();
    const wrapper = mountApp(<Button onClick={click} />);

    wrapper.find('button').simulate('click');

    expect(click).toBeCalled();
  });

  test('pass in custom class', () => {
    const wrapper = mountApp(<Button className="custom-test" />);
    const button = wrapper.find('button.custom-test');

    expect(button.length).toBe(1);
  });

  test('pass in description', () => {
    const wrapper = mountApp(<Button description="my button" />);
    const button = wrapper.find('button');

    expect(button.html().match(/my button/).length).toBe(1);
  });

  test('should disable button via props', () => {
    const wrapper = mountApp(<Button disabled={true} />);
    const button = wrapper.find('button');

    expect(button.props().disabled).toBeTruthy();
  });

  test('should not be disabled by default', () => {
    const wrapper = mountApp(<Button />);
    const button = wrapper.find('button');

    expect(button.props().disabled).toBeFalsy();
  });
});
