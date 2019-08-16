import React from 'react';
import { mount } from 'enzyme';
import AnimatedText from './AnimatedText';

describe('animated text component', () => {
  test('receive text via props', () => {
    const wrapper = mount(<AnimatedText />);
    const texts = wrapper.find('TypedText').prop('strings');
    expect(texts).toEqual(['']);
  });

  test('receive html to be typed', () => {
    const wrapper = mount(
      <AnimatedText
        text={[
          {
            line: '<p>my text to be typed</p>',
            key: 1
          }
        ]}
      />
    );
    const texts = wrapper.find('TypedText').prop('strings');
    expect(texts).toEqual(['<p>&lt;p&gt;my text to be typed&lt;/p&gt;</p>']);
  });
});