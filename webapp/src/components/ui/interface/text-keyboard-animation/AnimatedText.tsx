import ReactDOMServer from 'react-dom/server';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
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
}

export default function AnimatedText(props: Props ) {
  const { messages } = useIntl();
  const renderText = () =>  {
    const text: any = [];
    const prop: TextItem[] = props.text || [];

    prop.forEach((element: TextItem) => {
      text.push(
        <p key={element.key} className={element.style}>
          {get(messages, element.line, element.line)}
        </p>
      );
    });

    return [ReactDOMServer.renderToStaticMarkup(text)];
  };

  return (
    <TypedText
      strings={renderText()}
      onComplete={props.onFinishedTyping}
    />
  );
}

