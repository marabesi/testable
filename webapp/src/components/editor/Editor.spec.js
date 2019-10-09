import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Editor from './Editor';

describe('Editor component', () => {
  test('should accept class as prop', () => {
    const wrapper = shallow(<Editor className="my-editor" />);
    expect(wrapper.find('.my-editor').length).toEqual(1);
    wrapper.unmount();
  });

  test('should accept code mirror options from props', () => {
    const codeMirrorOptions = {
      readOnly: true
    };
    const wrapper = shallow(
      <Editor
        className="my-editor"
        options={codeMirrorOptions}
      />
    );

    expect(wrapper.instance().props.options.readOnly).toEqual(codeMirrorOptions.readOnly);
    wrapper.unmount();
  });

  describe('handle focus event when trying to type', () => {
    test('fire onFocus event when key is pressed', () => {
      const onFocus = jest.fn();
      const wrapper = shallow(
        <Editor
          className="my-editor"
          onFocus={onFocus}
        />
      );

      wrapper.instance().handleOnKeyPressed();

      expect(onFocus).toBeCalled();
    });

    test('remove focus on component unmounted', () => {
      const wrapper = shallow(
        <Editor
          className="my-editor"
        />
      );
      wrapper.instance().setState({
        editorIsFocused: true
      });

      wrapper.instance().componentWillUnmount();

      const focused = wrapper.instance().state.editorIsFocused;

      expect(focused).toBeFalsy();

      wrapper.unmount();
    });

    test('should invoke on props when trying to type text on a read only editor', () => {
      const onFocus = sinon.spy();
      const codeMirrorOptions = {
        readOnly: true
      };

      const wrapper = shallow(
        <Editor
          className="my-editor"
          options={codeMirrorOptions}
          onFocus={onFocus}
        />
      );

      wrapper.instance().onFocus();
      wrapper.unmount();

      expect(onFocus.called).toBeTruthy();
    });
  });
});