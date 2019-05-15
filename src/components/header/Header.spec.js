import React from 'react';
import Header from './Header';
import { shallow, mount } from 'enzyme';

describe('header component', () => {

  it('should render logo', () => {
    const wrapper = shallow(<Header />);
    const imgSrc = wrapper.find('[alt="logotipo"]');

    expect(imgSrc.prop('src')).toBe('assets/logo.png');
  });

  it('should render user progress', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('.user-progress').length).toEqual(1);
  });

  it('should render profile', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('.profile').length).toEqual(1);
  });
});
