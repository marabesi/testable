import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import './editor.scss';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/erlang-dark.css');

export default class Editor extends Component {

  render() {
    const options = {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'erlang-dark'
    };
    const { className } = this.props;
    return (
      <div className={`editor ${className} `}>
        <CodeMirror
          value={this.props.value}
          options={options}
          className="editor"
          onChange={this.props.codeChanged}
        />
      </div>);
  }
}