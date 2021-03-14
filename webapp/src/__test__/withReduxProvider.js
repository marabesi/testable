import { Provider } from 'react-redux';

import Store from '../data-flow/redux/store/store';

export const { store } = Store();

export function build(Component) {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}