/* eslint no-eval: 0 */
import React, { Component } from 'react';
import Editor from '../editor/Editor';
import PropTypes from 'prop-types';

export default class EditorManager extends Component {

  state = {
    codeOutput: {},
    codeError: {},
  };

  codeChanged = (code, editorIndexChanged) => {
    let codeError = Object.assign({}, this.state.codeError);
    codeError[editorIndexChanged] = '';

    this.setState({
      ...this.state.codeError, codeError: codeError
    });

    let codeOutput = Object.assign({}, this.state.codeOutput);
    codeOutput[editorIndexChanged] = '';

    let sourceCode = code;

    for (let i = 0; i < this.props.editor; i++) {
      if (i !== editorIndexChanged) {
        sourceCode += this.props.code[i];
      }
    }

    const lemming = new window.Lemming(code);

    lemming.onResult(result => {
      codeOutput[editorIndexChanged] = result;
      this.setState({
        ...this.state.codeOutput, codeOutput: codeOutput
      });
    });

    lemming.onError(error => {
      codeError[editorIndexChanged] = error;

      this.setState({
        ...this.state.codeError, codeError: codeError
      });
    });

    lemming.onCompleted(() => {
      const done = this.props.onValidCode[editorIndexChanged];
      done(this.props.code[editorIndexChanged], editorIndexChanged);
    });

    lemming.run({
      context: sourceCode
    });
  }

  resolveEditor = () => {
    const editors = [];
    const { className } = this.props;

    for (let i = 0; i < this.props.editor; i++) {
      editors.push(
        <div key={i} className={ `flex flex-col ${className}` }>
          <Editor
            key={i}
            value={this.props.code[i]}
            codeChanged={(code) => this.codeChanged(code, i)}
            className="source-code m-5 border-2 border-testable-blue-overlay"
          />
          <div className="m-auto mb-5 bg-blue-dark break-words">
            <p className="text-white">{this.state.codeOutput[i]}</p>
            <p className="text-red font-medium">{this.state.codeError[i]}</p>
          </div>
        </div>
      );
    }

    return editors;
  }

  render() {
    return (
      <React.Fragment>
        {this.resolveEditor()}
      </React.Fragment>
    );
  }
}

EditorManager.propTypes = {
  onValidCode: PropTypes.object,
  className: PropTypes.string,
  code: PropTypes.object,
  editor: PropTypes.number
};

EditorManager.defaultProps = {
  editor: 1
};