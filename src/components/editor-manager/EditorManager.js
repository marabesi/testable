/* eslint no-eval: 0 */
import React, { Component } from 'react';
import Editor from '../editor/Editor';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class EditorManager extends Component {

  constructor() {
    super();
    this.state = {
      codeOutput: {},
      codeError: {},
    };

    this.codeChanged = _.debounce(this.codeChanged.bind(this), 400);
  }

  codeChanged(code, editorIndexChanged) {
    let codeError = Object.assign({}, this.state.codeError);
    codeError[editorIndexChanged] = '';

    this.setState({
      ...this.state.codeError, codeError: codeError
    });

    let codeOutput = Object.assign({}, this.state.codeOutput);

    let sourceCode = code;

    for (let i = 0; i < this.props.editor; i++) {
      if (i !== editorIndexChanged) {
        sourceCode += this.props.code[i];
      }
    }

    const lemming = new window.Lemming(sourceCode);

    lemming.onResult(function (result) {
      codeOutput[editorIndexChanged] = result;
      this.setState({
        ...this.state.codeOutput, codeOutput: codeOutput
      });
    }.bind(this));

    lemming.onError(function (error) {
      codeError[editorIndexChanged] = error;

      this.setState({
        ...this.state.codeError, codeError: codeError
      });
    }.bind(this));

    lemming.onCompleted(function () {
      const done = this.props.onValidCode[editorIndexChanged];
      done(sourceCode, editorIndexChanged);
    }.bind(this));

    lemming.run();
  }

  resolveEditor() {
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