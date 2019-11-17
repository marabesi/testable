import React from 'react';
import { mount } from 'enzyme';
import Intro from './Intro';

describe('Intro component', () => {

  describe('default options', () => {
    test('should not exit on esc', () => {
      const wrapper = mount(
        <Intro
          initialStep={0}
          steps={[]}
          onExit={()=> {}}
        />
      );
  
      const options = wrapper.find('Steps').props('options');
  
      expect(options.exitOnEsc).toBeFalsy();
    });

    test('should not exit on overlay click', () => {
      const wrapper = mount(
        <Intro
          initialStep={0}
          steps={[]}
          onExit={()=> {}}
        />
      );
  
      const options = wrapper.find('Steps').props('options');
  
      expect(options.exitOnOverlayClick).toBeFalsy();
    });
  });
});