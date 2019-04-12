import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import './editor.scss';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

export default class Editor extends Component {

  render() {
    const { className } = this.props;
    return (
      <div className={`editor ${className} `}>
        <CodeMirror
          value={this.props.value}
          optins={this.props.options}
          className="editor"
          onChange={this.props.codeChanged}
        />
      </div>);
  }
}