import { Steps } from 'intro.js-react';
import config from '../../config';

import 'intro.js/introjs.css';
import './intro.scss';

export default function Intro(props) {
  const { isDebug } = config;
  return (
    <Steps
      {...props}
      options={{
        disableInteraction: true,
        showStepNumbers: false,
        exitOnEsc: isDebug ? true : false,
        hidePrev: true,
        exitOnOverlayClick: isDebug ? true : false,
        showButtons: true,
        showBullets: false,
        showProgress: true,
        skipLabel: 'Sair',
        nextLabel: 'Próximo',
        prevLabel: 'Anterior',
        doneLabel: 'Estou pronto!'
      }}
    />
  );
}