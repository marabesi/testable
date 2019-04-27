import React from 'react';
import Profile from './Profile';
import { shallow } from 'enzyme';

describe('profile component', () => {
  it('should place image from placeimg when user image does not exists', () => {
    const wrapper = shallow(<Profile user={{}} />);
    const imgSrc = wrapper.find('img');

    expect(imgSrc.prop('src')).toEqual('https://placeimg.com/200/200/any');
  });

  it('it should place user image when it exists', () => {
    const wrapper = shallow(<Profile user={{ photo: 'my.photo.com'}} />);
    const imgSrc = wrapper.find('img');

    expect(imgSrc.prop('src')).toEqual('my.photo.com'); 
  });
});
