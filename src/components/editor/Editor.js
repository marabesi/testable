import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import PropTypes from 'prop-types';

import './editor.scss';

require('codemirror/mode/javascript/javascript');
// @ts-ignore
require('codemirror/lib/codemirror.css');
// @ts-ignore
require('codemirror/theme/erlang-dark.css');

export default class Editor extends Component {

  render() {
    const { className, options } = this.props;
    const codeMirrorOptions = {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'erlang-dark',
      ...options
    };
    return (
      <div className={`editor ${className} `}>
        <CodeMirror
          value={this.props.value}
          options={codeMirrorOptions}
          className="editor"
          onChange={this.props.codeChanged}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  /**
   * The desired class to be toggle in the editor wrapper - this does not apply to the CodeMirror component
   */
  className: PropTypes.string,
  /**
   * The text to be placed inside the editor
   */
  value: PropTypes.string,
  /**
   * Callback executed when the editor code has changed. Important to note that this event is fired when the
   * editor is about to change the code. This event is fired before the code takes place inside the editor.
   */
  codeChanged: PropTypes.func,
};