import { Steps } from 'intro.js-react';
import { useIntl } from 'react-intl';
import config from '../../../../config';

import 'intro.js/introjs.css';
import './intro.scss';

export default function Intro(props) {
  const { isDebug } = config;
  const { messages }: any = useIntl();

  return (
    <Steps
      {...props}
      options={{
        disableInteraction: true,
        showStepNumbers: false,
        exitOnEsc: isDebug,
        hidePrev: true,
        exitOnOverlayClick: isDebug,
        showButtons: true,
        showBullets: false,
        showProgress: true,
        skipLabel: messages.intro.exit,
        nextLabel: messages.intro.next,
        prevLabel: messages.intro.previous,
        doneLabel: messages.intro.ready
      }}
    />
  );
}
