import React from 'react';
import { Provider } from 'react-redux';

import Store from '../../store/store';

const store = Store();

export function build(component) {
  return (
    <Provider store={store}>
      <component />
    </Provider>
  );
}