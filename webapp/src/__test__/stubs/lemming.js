const esprima = require('esprima');

export default class Lemming {
  /** @param {string} code */
  constructor(code) {
    this.code = code;
  }
  /** @param {function} cb */
  onResult = cb => {
    this.onResultCb = cb;
  };
  /** @param {function} cb */
  onError = cb => {
    this.onErrorCb = cb;
  };
  /** @param {function} cb */
  onCompleted = cb => {
    // @ts-ignore
    this.onCompletedCb = cb;
  };
  run = () => {
    try {
      // @ts-ignore
      esprima.parseScript(this.code);
      // @ts-ignore
      this.onResultCb(this.code);
    } catch (error) {
      // @ts-ignore
      this.onErrorCb(error.message);
    }

    // @ts-ignore
    this.onCompletedCb(this.code);
  };
}
