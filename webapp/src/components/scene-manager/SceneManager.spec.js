import React from 'react';
import { mount } from 'enzyme';
import SceneManager from './SceneManager';

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

  test('should initialize manager with scene 1', done => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    expect(wrapper.html()).toContain('');

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.html()).toContain('_ Hello world');
      wrapper.unmount();
      done();
    }, 1500);
  });

  test('should go to step 2 and then back to step 1', done => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    wrapper.instance().handleNextScene();
    wrapper.instance().handlePreviousScene();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.html()).toContain('_ Hello world');
      wrapper.unmount();
      done();
    }, 1500);
  });

  test('should go to the next scene (scene 2)', done => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    wrapper.instance().handleNextScene();

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.html()).toContain('step 2 content');
      wrapper.unmount();
      done();
    }, 1500);
  });

  test('should not go to previous step when it is in the first step already', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    const previous = wrapper.instance().handlePreviousScene();

    expect(previous).toBeFalsy();
  });

  test('should not go beyond last step', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    const goToLastStep = wrapper.instance().handleNextScene();
    const beyondLastStep = wrapper.instance().handleNextScene();

    wrapper.unmount();

    expect(goToLastStep).toBeUndefined();
    expect(beyondLastStep).toBeFalsy();
  });

  test('should pass in lastStep from the content json', () => {
    const contentWithLastStep = Object.assign({}, content);
    contentWithLastStep.steps[0].lastScene = true;

    const wrapper = mount(
      <SceneManager
        content={contentWithLastStep}
      />
    );

    wrapper.update();
    expect(wrapper.find('Scene').prop('lastScene')).toBe(true);
    wrapper.unmount();
  });

  test('should pass in lastStep as true when the last step is reached', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    wrapper.instance().handleNextScene();
    wrapper.update();
    expect(wrapper.find('Scene').prop('lastScene')).toBe(true);
    wrapper.unmount();
  });

  describe('debug button', () => {
    test('should not show up debug button by default', () => {
      const wrapper = mount(
        <SceneManager
          content={content}
        />
      );

      expect(wrapper.find('DebugButton').length).toBe(0);
    });
  });

  describe('empty content provided', () => {
    test('should handle gracefully empty json object', () => {
      const wrapper = mount(
        <SceneManager
          content={{}}
        />
      );
      expect(wrapper.find('Scene').length).toBe(0);
    });

    test('should handle gracefully json object with empty steps', () => {
      const wrapper = mount(
        <SceneManager
          content={{
            steps: []
          }}
        />
      );
      expect(wrapper.find('Scene').length).toBe(0);
    });
  });
});