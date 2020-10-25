//@ts-nocheck
import { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../editor/Editor';
import { SOURCE_CODE, TEST_CODE } from '../../constants/editor';

import './editor-manager.scss';

export default class EditorManager extends Component {

  state = {
    codeOutput: {},
    codeError: {},
  };

  codeChanged = (code, editorIndexChanged) => {
    let codeError = Object.assign({}, this.state.codeError);
    codeError[editorIndexChanged] = '';

    this.setState({ codeError: codeError });

    let codeOutput = Object.assign({}, this.state.codeOutput);
    codeOutput[editorIndexChanged] = '';

    const lemming = new window.Lemming(code);
    const errorCallback = this.props.onErrorCode[editorIndexChanged];

    lemming.onResult(result => {
      codeOutput[editorIndexChanged] = result;
      this.setState({ codeOutput: codeOutput });

      if (errorCallback) {
        errorCallback(false, editorIndexChanged);
      }
    });

    lemming.onError(error => {
      codeError[editorIndexChanged] = error;

      this.setState({ codeError: codeError });

      if (errorCallback) {
        errorCallback(true, editorIndexChanged);
      }
    });

    lemming.onCompleted(() => {
      const done = this.props.onValidCode[editorIndexChanged];
      done(code, editorIndexChanged);
    });

    let sourceCode = code;

    for (let i = 0; i < this.props.editor; i++) {
      if (i !== editorIndexChanged) {
        sourceCode += this.props.code[i];
      }
    }

    lemming.run({
      context: sourceCode,
      options: {
        timeout: 100
      }
    });
  }

  onEditorFocus = (isFocused, editorIndexChanged) => {
    if (isFocused && (this.props.options[editorIndexChanged] && this.props.options[editorIndexChanged].readOnly)) {
      this.props.options[editorIndexChanged].className = 'forbidden';
      // @todo maybe popup this method to the parent?
      this.forceUpdate();

      setTimeout(() => {
        this.props.options[editorIndexChanged].className = '';
        this.forceUpdate();
      }, 2000);
    }
    return isFocused;
  }

  render() {
    const editors = [];
    const { className, editor, style } = this.props;

    for (let i = 0; i < editor; i++) {
      const editorOptions = this.props.options[i];

      editors.push(
        <div key={i} className={ `flex flex-col ${className}` } style={style}>
          <Editor
            key={i}
            options={editorOptions}
            value={this.props.code ? this.props.code[i] : ''}
            codeChanged={code => this.codeChanged(code, i)}
            onFocus={isFocused => this.onEditorFocus(isFocused, i)}
            className={ `source-code border-2 border-testable-blue-overlay editor-${i} ${editorOptions ? editorOptions.className : ''}` }
          />
          <div className="m-auto md:mb-5 bg-blue-dark break-words">
            <p className="text-white h-6">{this.state.codeOutput[i]}</p>
            <p className="text-red font-medium h-6">{this.state.codeError[i]}</p>
          </div>
        </div>
      );
    }
  
    return editors;
  }
}

EditorManager.propTypes = {
  onValidCode: PropTypes.object,
  onErrorCode: PropTypes.object,
  className: PropTypes.string,
  code: PropTypes.object,
  editor: PropTypes.number,
  style: PropTypes.object,
  options: PropTypes.object
};

EditorManager.defaultProps = {
  editor: 1,
  style: {},
  options: {
    [SOURCE_CODE]: {},
    [TEST_CODE]: {}
  },
  onErrorCode: {
    [SOURCE_CODE]: null,
    [TEST_CODE]: null
  },
};
