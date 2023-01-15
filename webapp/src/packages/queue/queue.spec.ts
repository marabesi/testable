import { vitest } from 'vitest';
import Queue from './queue';

/* eslint-disable-next-line */
global.fetch = function(requestInfo) {
  return Promise.resolve(new Response(new Blob(['1', '2', '3'])));
};

describe('queue behavior', () => {
  let instance: Queue;

  beforeEach(() => {
    instance = new Queue();
  });

  test('pass in FileReader instance', () => {
    const reader = new FileReader();
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
      getItem: vitest.fn(),
      setItem: vitest.fn(),
    };

    instance.storage = mockedLocalStorage;

    await instance.fetch([
      '/my/asset/b.png'
    ]);

    expect(mockedLocalStorage.getItem).toHaveBeenCalledWith('testable.b.png');
  });

  test('should not fetch assets that exists already', async () => {
    const mockedLocalStorage = {
      /* eslint-disable-next-line */
      getItem: itemKey => true,
      setItem: vitest.fn(),
    };

    instance.storage = mockedLocalStorage;

    await instance.fetch([
      '/my/asset/b.png'
    ]);

    expect(mockedLocalStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
