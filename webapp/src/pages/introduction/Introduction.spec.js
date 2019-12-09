import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Introduction from './Introduction';
import SceneManager from '../../components/scene-manager/SceneManager';

describe('Introduction page', () => {
  test('should define route to redirect to when done', () => {
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

    wrapper.find(SceneManager).props().handleLastScene();

    wrapper.update();

    expect(history.push).toBeCalledWith('tutorial');
  });
});
