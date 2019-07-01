import React from 'react';
import EditorManager from './EditorManager';
import { shallow, mount } from 'enzyme';
describe('EditorManager component', () => {
  global.document.body.createTextRange = function () {
    return {
      setEnd: function () { },
      setStart: function () { },
      getBoundingClientRect: function () {
        return { right: 0 };
      },
      getClientRects: function () {
        return {
          length: 0,
          left: 0,
          right: 0
        }
      }
    }
  };

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
    const wrapper = mount(
      <EditorManager
        code={{0: ''}}
      />
    );

    expect(wrapper.instance().state.codeOutput).toEqual({});
    expect(wrapper.instance().state.codeError).toEqual({});
  });

  test('should render editor based on the editor prop', () => {
    const wrapper = shallow(
      <EditorManager
        editor={2}
      />
    );

    expect(wrapper.find('.editor-0').length).toEqual(1);
    expect(wrapper.find('.editor-1').length).toEqual(1);
  });
});