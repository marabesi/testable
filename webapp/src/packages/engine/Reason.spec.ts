import Reason from './Reason';

describe('Reason', () => {
  const originalConsole = globalThis.console;

  beforeEach(() => {
    globalThis.console.warn = jest.fn();
  });

  afterEach(() => {
    globalThis.console = originalConsole;
  });

  test('should parse var declaration', () => {
    const strategy = jest.fn();

    Reason('var b = 1;', strategy);
    expect(strategy).toHaveBeenCalled();
  });

  test('should execute strategy on Program type only', () => {
    const strategy = jest.fn();

    Reason('const a = 12;', strategy);
    expect(strategy).toHaveBeenCalled();
  });

  test.each([['function']])(
    'should not bubble up the error when a invalid source code is provided',
    (code) => {
      const strategy = jest.fn();

      const result = Reason(code, strategy);
      expect(strategy).toHaveBeenCalledTimes(0);
      expect(result).toBeFalsy();
      expect(globalThis.console.warn).toHaveBeenCalled();
    }
  );
});
