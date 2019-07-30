import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Introduction } from './Introduction';

describe('Introduction page', () => {
  let wrapper;
  const onLoading = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Introduction onLoading={onLoading} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  test('should redirect to tutorial page', done => {
    wrapper.find('Introduction').instance().handleLastScene();

    wrapper.update();

    setTimeout(() => {
      done();
      wrapper.update();
      expect(wrapper.find('Redirect').length).toEqual(1);
    }, 1100);
  });
});
