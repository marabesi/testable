/* eslint no-eval: 0 */
import * as React from 'react';
import Editor from '../editor/Editor';
// @ts-ignore
import PropTypes from 'prop-types';

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

    // @ts-ignore
    lemming.onResult(result => {
      // @ts-ignore
      codeOutput[editorIndexChanged] = result;
      this.setState({
        ...this.state.codeOutput, codeOutput: codeOutput
      });
    });

    // @ts-ignore
    lemming.onError(error => {
      // @ts-ignore
      codeError[editorIndexChanged] = error;

      this.setState({
        ...this.state.codeError, codeError: codeError
      });
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
      context: sourceCode
    });
  }

  render() {
    const editors = [];
    const { className } = this.props;
  
    for (let i = 0; i < this.props.editor; i++) {
      editors.push(
        <div key={i} className={ `flex flex-col ${className}` }>
          <Editor
            key={i}
            value={this.props.code ? this.props.code[i] : ''}
            // @ts-ignore
            codeChanged={(code) => this.codeChanged(code, i)}
            className={ `source-code border-2 border-testable-blue-overlay editor-${i}` }
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
  className: PropTypes.string,
  code: PropTypes.object,
  editor: PropTypes.number
};

EditorManager.defaultProps = {
  editor: 1
};