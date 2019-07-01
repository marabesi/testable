import React from 'react';
import Intro from './Intro';
import { mount } from 'enzyme';

describe('Intro component', () => {

  describe('default options', () => {
    it('should not exit on esc', () => {
      const wrapper = mount(
        <Intro
          initialStep={0}
          steps={[]}
          onExit={()=> {}}
        />
      );
  
      const options = wrapper.find('Steps').props('options');
  
      expect(options.exitOnEsc).toBeFalsy()
    });

    it('should not exit on overlay click', () => {
      const wrapper = mount(
        <Intro
          initialStep={0}
          steps={[]}
          onExit={()=> {}}
        />
      );
  
      const options = wrapper.find('Steps').props('options');
  
      expect(options.exitOnOverlayClick).toBeFalsy()
    });
  });
});