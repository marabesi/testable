import React from 'react';
import { shallow } from 'enzyme';
import Editor from './Editor';

describe('Editor component', () => {
  // test('should emit event when the code changes', () => {

  // });

  test('should accept class as prop', () => {
    const wrapper = shallow(<Editor className="my-editor" />);
    expect(wrapper.find('.my-editor').length).toEqual(1);
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
  });
});