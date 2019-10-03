import configureStore from './store';

describe('store', () => {

  test('register reducers', () => {
    expect(configureStore().getState()).toEqual({
      'guideReducer': {},
      'userReducer': { user: {} },
      'loadingReducer': { loading: true },
      'editorReducer': {},
      'localeReducer': { locale: 'en' },
      'optionsReducer': { options: { animation: true }}
    });
  });
});
