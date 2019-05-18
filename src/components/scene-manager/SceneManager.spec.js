import React from 'react';
import SceneManager from './SceneManager';
import { mount } from 'enzyme';

describe('Scene manager component', () => {

  const content = { 
    'version': 1,
    'steps': [
      {
        'step': 1,
        'button': 'step 1',
        'content': [
          {
            'line': '_ Hello world',
            'style': 'p-2 text-blue-light'
          }
        ]
      },
      {
        'step': 2,
        'button': 'step 2',
        'content': [
          {
            'line': 'step 2 content',
            'style': 'p-2 text-blue-light'
          }
        ]
      }
    ]
  };

  it('should initialize manager with scene 1', done => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    expect(wrapper.html()).toContain('');

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.html()).toContain('_ Hello world');
      done();
    }, 1500);
  });

  it('should go to scene 2', done => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    wrapper.instance().handleNextScene();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.html()).toContain('step 2 content');
      done();
    }, 1000);
  });
});