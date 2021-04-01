import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from './locale';

interface Props {
  locale: string;
  children: ReactNode
}

function Provider({ locale, children }: Props) {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      { children}
    </IntlProvider>
  );
}

export default Provider;