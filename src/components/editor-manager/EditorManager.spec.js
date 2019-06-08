import React from 'react';
import EditorManager from './EditorManager';
import { shallow } from 'enzyme';

describe('EditorManager component', () => {

  global.Lemming = function(code) {
    this.onResult = function(cb) {
      cb();
    };
    this.onError = function(cb) {
      cb();
    };
    this.onCompleted = function(cb) {
      cb();
    };
    this.run = function() {
      return;
    };
  };

  test('code output and code error should be empty', () => {
    const wrapper = shallow(
      <EditorManager
        code={{0: ''}}
      />
    );

    expect(wrapper.instance().state.codeOutput).toEqual({});
    expect(wrapper.instance().state.codeError).toEqual({});
  });
});