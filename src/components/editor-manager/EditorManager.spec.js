import React from 'react';
import EditorManager from './EditorManager';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('EditorManager component', () => {

  it('should populate code error', () => {
    const wrapper = shallow(<EditorManager />);

    wrapper.instance().codeChanged('b');

    const error = wrapper.find('div p');

    expect(error.at(0).text()).toEqual('');
    expect(error.at(1).text()).toEqual('b is not defined');
  });

  it('should populate code output', () => {
    const onValidCode = sinon.spy();
    const wrapper = shallow(
      <EditorManager
        onValidCode={onValidCode}
      />
    );

    wrapper.instance().codeChanged('var b = 1; b');

    const error = wrapper.find('div p');

    expect(onValidCode.called).toBeTruthy();

    expect(error.at(0).text()).toEqual('1');
    expect(error.at(1).text()).toEqual('');
  });
});