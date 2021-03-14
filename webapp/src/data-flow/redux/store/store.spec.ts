import configureStore from './store';

describe('store', () => {

  test('register reducers', () => {
    const { store } = configureStore();
    expect(store.getState()).toEqual({
      '_persist': {
        'rehydrated': false,
        'version': -1,
      },
      'guideReducer': {},
      'userReducer': { user: {} },
      'loadingReducer': { loading: true },
      'editorReducer': {},
      'localeReducer': { locale: 'pt-br' },
      'optionsReducer': { options: { animation: true } }
    });
  });
});
