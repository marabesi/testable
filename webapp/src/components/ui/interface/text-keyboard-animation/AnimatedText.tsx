import { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import TypedText from './TypedText';

export interface TextItem {
  key: number;
  style: string;
  line: string;
}

interface Props {
  className: string;
  text: TextItem[];
  onFinishedTyping: any
}

export default class AnimatedText extends Component<Props> {

  renderText() {
    const text: any = [];
    const prop: TextItem[] = this.props.text || [];
    
    prop.forEach((element: TextItem) => {
      text.push(
        <p key={element.key} className={element.style}>{element.line}</p>
      );
    });

    return [ReactDOMServer.renderToStaticMarkup(text)];
  }

  render() {
    return (
      <TypedText
        strings={this.renderText()}
        onComplete={this.props.onFinishedTyping}
      />
    );
  }
}

