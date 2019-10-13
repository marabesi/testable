import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Introduction from './Introduction';

describe('Introduction page', () => {
  test('should define route to redirect to when done', done => {
    const history = {
      push: jest.fn()
    };

    const wrapper = mount(
      <BrowserRouter>
        <Introduction
          history={history}
        />
      </BrowserRouter>
    );
    wrapper.find('SceneContentManager').instance().handleLastScene();

    wrapper.update();

    setTimeout(() => {
      done();
      wrapper.update();
      expect(history.push).toBeCalledWith('tutorial');
    }, 1100);
  });
});
