//@ts-nocheck
import { Component } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { solarizedDark } from '@uiw/codemirror-theme-solarized';
import { content } from '@uiw/codemirror-extensions-events';

import PropTypes from 'prop-types';

import './editor.scss';

export default class Editor extends Component {

  state = {
    editorIsFocused: false
  }

  extension = content({
    focus: () => {
      this.onFocus(true);
    },
    blur: () => {
      this.onFocus(false);
    },
  });

  onFocus = (isFocused: boolean) => {
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
      showCursorWhenSelecting: false,
      autocompletion: false,
      ...options
    };
    return (
      <div className={`editor ${className} `}>
        <CodeMirror
          theme={solarizedDark}
          extensions={[javascript({ jsx: true }), this.extension]}
          value={this.props.value}
          height="300px"
          basicSetup={codeMirrorOptions}
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
