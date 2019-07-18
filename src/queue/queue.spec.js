import Queue from '../queue/queue';

describe('queue behavior', () => {
  let instance = null;

  beforeEach(() => {
    instance = new Queue();
  });

  afterEach(() => {
    instance = null;
  });

  test('pass in FileReader instance', () => {
    const reader = { p: 1 };
    Queue.reader = reader;
    expect(Queue.reader).toBe(reader);
  });

  test('return FileReader instance by default', () => {
    expect(Queue.reader).toBeTruthy();
  });

  test('by default should use FileReade from window object', () => {
    expect(instance.reader).toBeTruthy();
  });

  test('pass in localStorage instance', () => {
    const storage = { my: 1 };
    Queue.storage = storage;
    expect(Queue.storage).toBe(storage);
  });

  test('by default should use localStorage from window object', () => {
    expect(instance.storage).toBe(window.localStorage);
  });

  test('should extract file name from response', () => {
    const response = {
      url: 'http://local/file.png'
    };

    expect(instance.extractFileName(response)).toEqual('testable.file.png');
  });
});