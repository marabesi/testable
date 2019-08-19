/* eslint no-eval: 0 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Editor from '../editor/Editor';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';

import './editor-manager.scss';

export default class EditorManager extends React.Component {

  state = {
    codeOutput: {},
    codeError: {},
  };

  /**
  * @param {string} code
  * @param {number} editorIndexChanged
  */
  codeChanged = (code, editorIndexChanged) => {
    let codeError = Object.assign({}, this.state.codeError);
    // @ts-ignore
    codeError[editorIndexChanged] = '';

    this.setState({
      ...this.state.codeError, codeError: codeError
    });

    let codeOutput = Object.assign({}, this.state.codeOutput);
    // @ts-ignore
    codeOutput[editorIndexChanged] = '';

    // @ts-ignore
    const lemming = new window.Lemming(code);
    const errorCallback = this.props.onErrorCode[editorIndexChanged];

    // @ts-ignore
    lemming.onResult(result => {
      // @ts-ignore
      codeOutput[editorIndexChanged] = result;
      this.setState({
        ...this.state.codeOutput, codeOutput: codeOutput
      });

      if (errorCallback) {
        errorCallback(false, editorIndexChanged);
      }
    });

    // @ts-ignore
    lemming.onError(error => {
      // @ts-ignore
      codeError[editorIndexChanged] = error;

      this.setState({
        ...this.state.codeError, codeError: codeError
      });

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
            // @ts-ignore
            codeChanged={code => this.codeChanged(code, i)}
            onFocus={isFocused => this.onEditorFocus(isFocused, i)}
            className={ `source-code border-2 border-testable-blue-overlay editor-${i} ${editorOptions ? editorOptions.className : ''}` }
          />
          <div className="m-auto mb-5 bg-blue-dark break-words">
            <p className="text-white h-6">{
            // @ts-ignore
              this.state.codeOutput[i]}</p>
            <p className="text-red font-medium h-6">{
              // @ts-ignore
              this.state.codeError[i]}</p>
          </div>
        </div>
      );
    }
  
    return (
      <React.Fragment>
        {editors}
      </React.Fragment>
    );
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
