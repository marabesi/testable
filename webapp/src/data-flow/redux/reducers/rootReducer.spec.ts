import rootReducer from './rootReducer';

describe('root reducer', () => {

  test('should register reducers', () => {
    expect(rootReducer.length).toBe(2);
  });
});
