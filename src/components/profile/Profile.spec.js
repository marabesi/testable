import React from 'react';
import Profile from './Profile';
import { shallow } from 'enzyme';

describe('profile component', () => {
  it('should place image from placeimg when user image does not exists', () => {
    const wrapper = shallow(<Profile user={{}} />);
    const imgSrc = wrapper.find('img');

    expect(imgSrc.prop('src')).toEqual('https://placeimg.com/200/200/any');
  });

  it('should place user image when it exists', () => {
    const wrapper = shallow(<Profile user={{ photo: 'my.photo.com'}} />);
    const imgSrc = wrapper.find('img');

    expect(imgSrc.prop('src')).toEqual('my.photo.com'); 
  });

  it('should have name and email on title property', () => {
    const wrapper = shallow(<Profile user={{ name: 'john', email: 'john@john.com' }} />);
    const container = wrapper.find('div');

    expect(container.at(0).prop('title')).toEqual('john - john@john.com'); 
  });
});
