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
    wrapper = null
  });

  test('should render loading component', () => {
    wrapper.find('Introduction').instance().handleLastScene();

    wrapper.update();

    expect(wrapper.find('Loading').length).toEqual(1);
  });

  test('should redirect to tutorial page', done => {
    wrapper.find('Introduction').instance().handleLastScene();

    wrapper.update();

    setTimeout(() => {
      done();
      wrapper.update();
      expect(wrapper.find('Redirect').length).toEqual(1);
    }, 1100)
  });
});
