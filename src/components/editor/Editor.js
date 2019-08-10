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
  className: PropTypes.string,
  value: PropTypes.string,
  codeChanged: PropTypes.func,
};