export const localStorageMock = (function () {
  let store = {};

  return {
    /**
     * @param {string} key 
     */
    getItem(key) {
      // @ts-ignore
      return store[key] || null;
    },
    /**
     * @param {string} key 
     * @param {any} value 
     */
    setItem(key, value) {
      // @ts-ignore
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
}());