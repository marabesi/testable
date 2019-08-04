import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { mount } from 'enzyme';
import { TutorialEnd } from './TutorialEnd';

describe('TutorialEnd page', () => {
  test('render without crashing', () => {
    const wrapper = mount(<TutorialEnd />);

    expect(wrapper.find('SceneManager').length).toBe(1);
  });

  test('should not render debug button by default', () => {
    const wrapper = mount(<TutorialEnd />);

    expect(wrapper.find('DebugButton').length).toBe(0);
  });

  test('should enable loading', () => {
    const onLoading = jest.fn();

    const wrapper = mount(
      <BrowserRouter>
        <TutorialEnd onLoading={onLoading} />
      </BrowserRouter>
    );
    wrapper.find('TutorialEnd').instance().handleLastScene();

    expect(onLoading).toBeCalledWith(true);
  });

  test('should disable loading', done => {
    const onLoading = jest.fn();

    const wrappedWithRouter = mount(
      <BrowserRouter>
        <TutorialEnd onLoading={onLoading} />
      </BrowserRouter>
    );

    wrappedWithRouter.find('TutorialEnd').instance().handleLastScene();

    setTimeout(() => {
      expect(onLoading).toBeCalledWith(false);
      done();
    }, 1400);
  });
});
