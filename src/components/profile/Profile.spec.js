import React from 'react';
import Profile from './Profile';
import { mount } from 'enzyme';

describe('Profile component', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Profile />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });
});