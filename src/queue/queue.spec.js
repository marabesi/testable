import sinon from 'sinon';
import Queue from '../queue/queue';

global.fetch = function(requestInfo) {
  return Promise.resolve(new Response(new Blob([1, 2, 3])));
};

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
    instance.reader = reader;
    expect(instance.reader).toBe(reader);
  });

  test('return FileReader instance by default', () => {
    expect(instance.reader).toBeTruthy();
  });

  test('by default should use FileReade from window object', () => {
    expect(instance.reader).toBeTruthy();
  });

  test('pass in localStorage instance', () => {
    const storage = { my: 1 };
    instance.storage = storage;
    expect(instance.storage).toBe(storage);
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

  test('should fetch assets that does not exists', async () => {
    const mockedLocalStorage = {
      getItem: sinon.spy(),
      setItem: sinon.spy(),
    };

    instance.storage = mockedLocalStorage;

    await instance.fetch([
      '/my/asset/b.png'
    ]);

    expect(mockedLocalStorage.getItem.calledWith('testable.b.png')).toBeTruthy();
  });

  test('should not fetch assets that exists already', async () => {
    const mockedLocalStorage = {
      getItem: itemKey => true,
      setItem: sinon.spy(),
    };

    instance.storage = mockedLocalStorage;

    await instance.fetch([
      '/my/asset/b.png'
    ]);

    expect(mockedLocalStorage.setItem.called).toBeFalsy();
  });
});