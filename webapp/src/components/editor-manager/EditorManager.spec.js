import React from 'react';
import { shallow, mount } from 'enzyme';
import EditorManager from './EditorManager';
import { SOURCE_CODE } from '../../constants/editor';
import lemming from '../../__test__/stubs/lemming';

describe('EditorManager component', () => {
  /* eslint-disable-next-line */
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
        };
      }
    };
  };

  /* eslint-disable-next-line */
  global.Lemming = lemming;

  test('should invoke onValidCode callback when code execution is done', () => {
    const onValidCode = jest.fn();

    const wrapper = mount(
      <EditorManager
        code={{[SOURCE_CODE]: ''}}
        onValidCode={{[SOURCE_CODE]: onValidCode}}
      />
    );
    const code = 'var b = 1;';
    wrapper.instance().codeChanged(code, 0);
    expect(onValidCode).toHaveBeenCalledWith(code, 0);
  });

  test('should populate error field when invalid code is written', () => {
    const onValidCode = jest.fn();

    const wrapper = mount(
      <EditorManager
        editor={1}
        code={{[SOURCE_CODE]: ''}}
        onValidCode={{[SOURCE_CODE]: onValidCode}}
      />
    );
    const code = '[;';
    wrapper.instance().codeChanged(code, 0);
    wrapper.update();

    expect(wrapper.find('p').at(1).text()).toEqual('Line 1: Unexpected token ;');
  });

  test('code output and code error should be empty by default', () => {
    const wrapper = mount(
      <EditorManager
        code={{[SOURCE_CODE]: ''}}
      />
    );

    expect(wrapper.instance().state.codeOutput).toEqual({});
    expect(wrapper.instance().state.codeError).toEqual({});
  });

  test('should render two independents (editor based on the editor prop)', () => {
    const wrapper = shallow(
      <EditorManager
        editor={2}
      />
    );

    expect(wrapper.find('.editor-0').length).toEqual(1);
    expect(wrapper.find('.editor-1').length).toEqual(1);
  });

  test('should pass in custom options to the editor', () => {
    const wrapper = shallow(
      <EditorManager
        editor={1}
        options={{
          0: {
            customProp: 'custom value'
          }
        }}
      />
    );

    expect(wrapper.instance().props.options[0].customProp).toEqual('custom value');
    expect(wrapper.find('Editor').props().options.customProp).toEqual('custom value');
  });

  test('should toggle attention class (animation to focus the editor)', () => {
    const wrapper = shallow(
      <EditorManager
        editor={1}
        options={{
          0: {
            className: 'attention'
          }
        }}
      />
    );

    expect(wrapper.find('.editor-0.attention').length).toEqual(1);
  });

  test('try to focus an editor that does not have readOnly defined', () => {
    const wrapper = shallow(
      <EditorManager
        editor={1}
        options={{}}
      />
    );
    const isFocused = wrapper.instance().onEditorFocus(true, SOURCE_CODE);
    expect(isFocused).toBe(true);
  });

  test('should toggle forbidden animation class when focus a read only editor', done => {
    const wrapper = shallow(
      <EditorManager
        editor={1}
        options={{
          [SOURCE_CODE]: {
            readOnly: true
          }
        }}
      />
    );

    wrapper.instance().onEditorFocus(true, SOURCE_CODE);
    wrapper.update();

    expect(wrapper.find('.editor-0.forbidden').length).toEqual(1);

    setTimeout(() => {
      expect(wrapper.find('.editor-0.forbidden').length).toEqual(0);
      done();
    }, 3000);
  });
});