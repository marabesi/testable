import configureStore from './store';

describe('store', () => {

  test('register reducers', () => {
    expect(configureStore().getState()).toEqual({
      'guideReducer': {},
      'userReducer': {}
    });
  });
});
