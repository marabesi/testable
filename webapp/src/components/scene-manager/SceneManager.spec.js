import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils'; 
import SceneManager from './SceneManager';
import Scene from './Scene';

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

  test('should initialize manager with scene 1', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    expect(wrapper.find(Scene).props().step).toEqual(1);
    expect(wrapper.find(Scene).props().text).toEqual(content.steps[0].content);
  });

  test('should go to step 2', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    act(() => {
      wrapper.find(Scene).props().next();
    });

    wrapper.update();

    expect(wrapper.find(Scene).props().step).toEqual(2);
    expect(wrapper.find(Scene).props().text).toEqual(content.steps[1].content);
  });

  test('should go to step 1', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    act(() => {
      wrapper.find(Scene).props().next(); // step 2
    });

    wrapper.update();

    act(() => {
      wrapper.find(Scene).props().previous(); // going back - step 1
    });

    wrapper.update();

    expect(wrapper.find(Scene).props().step).toEqual(1);
    expect(wrapper.find(Scene).props().text).toEqual(content.steps[0].content);
  });

  test('should not go to previous step when it is in the first step already', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    act(() => {
      wrapper.find(Scene).props().previous();
    });

    wrapper.update();

    expect(wrapper.find(Scene).props().step).toEqual(1);
  });

  test('should not go beyond last step', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    act(() => {
      wrapper.find(Scene).props().next(); // step 2
    });

    wrapper.update();

    act(() => {
      wrapper.find(Scene).props().next(); // step 3 - doesn't exists
    });

    wrapper.update();

    expect(wrapper.find(Scene).props().step).toEqual(2);
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

    expect(wrapper.find(Scene).props().lastScene).toBe(true);
  });

  test('should pass in lastStep as true when the last step is reached', () => {
    const wrapper = mount(
      <SceneManager
        content={content}
      />
    );

    act(() => {
      wrapper.find(Scene).props().next(); // go to step 2 - the last step
    });

    wrapper.update();

    expect(wrapper.find(Scene).props().lastScene).toBe(true);
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
      expect(wrapper.find(Scene).length).toBe(0);
    });

    test('should handle gracefully json object with empty steps', () => {
      const wrapper = mount(
        <SceneManager
          content={{
            steps: []
          }}
        />
      );
      expect(wrapper.find(Scene).length).toBe(0);
    });
  });
});