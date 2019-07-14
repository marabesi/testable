import AsyncComponent from './AsyncComponent';

describe('async component', () => {
  test('load component async', () => {
    const component = AsyncComponent();
    expect(typeof component).toBe('function');
  });
});
