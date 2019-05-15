import React, { Component } from 'react';
import Background from '../../components/background/Background';
import EditorManager from '../../components/editor-manager/EditorManager';

export default class Tdd extends Component {

  render() {
    return (
      <Background>
        <div className="flex justify-center">
          <EditorManager
            className="w-2/5"
            onValidCode={this.onValidCode}
          />
          <EditorManager
            className="w-2/5 m-5"
            onValidCode={this.onValidCode}
          />
        </div>
      </Background>
    );
  }
}
