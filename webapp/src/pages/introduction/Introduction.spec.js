import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Introduction from './Introduction';

describe('Introduction page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Introduction />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  test('should define route to redirect to when done', done => {
    wrapper.find('SceneContentManager').instance().handleLastScene();

    wrapper.update();

    setTimeout(() => {
      done();
      wrapper.update();
      expect(wrapper.find('Redirect').length).toEqual(1);
    }, 1100);
  });
});
