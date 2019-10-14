import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import CompletedIntro from './CompletedIntro';
import Emmiter, { LEVEL_UP } from '../../emitter/Emitter';

describe('completed page',  () => {

  let wrappedComponent = null;

  beforeEach(() => {
    Emmiter.removeAllListeners(LEVEL_UP);
    wrappedComponent = shallow(
      <BrowserRouter>
        <CompletedIntro />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    Emmiter.removeAllListeners(LEVEL_UP);
    wrappedComponent = null;
  });

  test('render SceneManager', () => {
    expect(wrappedComponent.find('SceneContentManager').length).toBe(1);
  });
});
