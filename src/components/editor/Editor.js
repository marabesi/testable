// @ts-nocheck
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import PropTypes from 'prop-types';

import './editor.scss';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/erlang-dark.css');

export default class Editor extends Component {

  state = {
    editorIsFocused: false
  }

  onFocus = (isFocused) => {
    this.setState({
      editorIsFocused: isFocused
    });
    this.props.onFocus(isFocused);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleOnKeyPressed, false);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleOnKeyPressed, false);
    this.setState({
      editorIsFocused: false
    });
  }

  handleOnKeyPressed = () => {
    this.props.onFocus(this.state.editorIsFocused);
  }

  render() {
    const { className, options } = this.props;
    const codeMirrorOptions = {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'erlang-dark',
      showCursorWhenSelecting: false,
      ...options
    };
    return (
      <div className={`editor ${className} `}>
        <CodeMirror
          value={this.props.value}
          options={codeMirrorOptions}
          className="editor"
          onChange={this.props.codeChanged}
          onFocusChange={this.onFocus}
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
  /**
   * Callback executed when the editor is focused
   */
  onFocus: PropTypes.func,
  /**
   * javascript object with codemirror options
   * @see https://codemirror.net/3/doc/manual.html
   */
  options: PropTypes.object
};

Editor.defaultProps = {
  options: {},
  onFocus: () => {},
  codeChanged: () => {},
};