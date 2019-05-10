import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';

describe('header component', () => {

  it('should render logo', () => {
    const wrapper = shallow(<Header />);
    const imgSrc = wrapper.find('[alt="logotipo"]');

    expect(imgSrc.prop('src')).toBe('assets/logo.png');
  });

  it('should render user progress', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.user-progress').length).toEqual(1);
  });
});
