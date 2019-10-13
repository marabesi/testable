import React from 'react';
import { mount } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import TutorialEnd from './TutorialEnd';

describe('TutorialEnd page', () => {
  test('render without crashing', () => {
    const wrapper = mount(<TutorialEnd />);

    expect(wrapper.find('SceneManager').length).toBe(1);
  });

  test('should not render debug button by default', () => {
    const wrapper = mount(<TutorialEnd />);

    expect(wrapper.find('DebugButton').length).toBe(0);
  });

  test('should redirect to unit testing intro page when done', done => {
    const history = {
      push: jest.fn()
    };
    const wrappedWithRouter = mount(
      <BrowserRouter>
        <TutorialEnd history={history}/>
      </BrowserRouter>
    );

    wrappedWithRouter.find(TutorialEnd).instance().handleLastScene();

    setTimeout(() => {
      wrappedWithRouter.update();
      expect(history.push).toBeCalledWith('unit-testing-intro');
      done();
    }, 1400);
  });
});