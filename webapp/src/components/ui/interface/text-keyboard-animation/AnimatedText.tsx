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

export default function AnimatedText(props: Props ) {

  const renderText = () =>  {
    const text: any = [];
    const prop: TextItem[] = props.text || [];
    
    prop.forEach((element: TextItem) => {
      text.push(
        <p key={element.key} className={element.style}>{element.line}</p>
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

