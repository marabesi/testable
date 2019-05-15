/* eslint no-eval: 0 */
import React, { Component } from 'react';
import Editor from '../editor/Editor';
import Background from '../background/Background';
import PropTypes from 'prop-types';

export default class EditorManager extends Component {

  constructor() {
    super();
    this.state = {
      codeOutput: '',
      codeError: '',
      code: 'var a = 1;',
    };

    this.codeChanged = this.codeChanged.bind(this);
  }

  codeChanged(code) {
    try {
      this.setState({
        ...this.state.codeError, codeError: ''
      });

      const result = eval(code);
      const stringify = result ? result.toString() : '';

      this.setState({
        ...this.state.codeOutput, codeOutput: stringify
      });

      this.props.onValidCode(code);
    } catch (error) {
      this.setState({
        ...this.state.codeError, codeError: error.message
      });
    }
  }

  render() {
    const { className } = this.props;
    return (
      <Background>
        <div className={`mt-5 ${className}`}>
          <div className="flex justify-center">
            <Editor
              value={this.state.code}
              codeChanged={this.codeChanged}
              className="source-code m-5 border-2 border-testable-blue-overlay"
            />
          </div>

          <div className="m-auto mb-5 bg-blue-dark break-words">
            <p className="text-white">{this.state.codeOutput}</p>
            <p className="text-red font-medium">{this.state.codeError}</p>
          </div>
        </div>
      </Background>
    );
  }
}

EditorManager.propTypes = {
  onValidCode: PropTypes.func,
  className: PropTypes.string
};
