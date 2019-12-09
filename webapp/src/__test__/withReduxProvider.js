//@ts-nocheck
import React from 'react';
import { Provider } from 'react-redux';

import Store from '../store/store';

export const store = Store();

export function build(Component) {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}