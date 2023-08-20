import {mount, MountRendererProps} from 'enzyme';
import {ReactElement} from 'react';
import {IntlProvider} from 'react-intl';

export function mountApp(
  Component: ReactElement,
  options?: MountRendererProps,
) {
  return mount(
    <IntlProvider locale="en">
      { Component }
    </IntlProvider>,
    options
  );
}
