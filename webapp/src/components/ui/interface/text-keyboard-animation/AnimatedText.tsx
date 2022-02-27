import ReactDOMServer from 'react-dom/server';
import { get } from 'lodash';
import TypedText from './TypedText';

export interface TextItem {
  key: number;
  line: string;
  style?: string;
}

interface Props {
  className?: string;
  text: TextItem[];
  onFinishedTyping?: any;
  intl?: any;
}

export default function AnimatedText(props: Props ) {
  const renderText = () =>  {
    const text: any = [];
    const prop: TextItem[] = props.text || [];

    prop.forEach((element: TextItem) => {
      text.push(
        <p key={element.key} className={element.style}>
          {get(props.intl, `messages.${element.line}`, element.line)}
        </p>
      );
    });
    // console.log(text);
    return [ReactDOMServer.renderToStaticMarkup(text)];
  };

  return (
    <TypedText
      strings={renderText()}
      onComplete={props.onFinishedTyping}
    />
  );
}

