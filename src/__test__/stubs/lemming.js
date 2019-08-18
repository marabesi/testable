const esprima = require('esprima');

export default class Lemming {
  constructor(code) {
    this.code = code;
  }
  onResult = cb => {
    this.onResultCb = cb;
  };
  onError = cb => {
    this.onErrorCb = cb;
  };
  onCompleted = cb => {
    // @ts-ignore
    this.onCompletedCb = cb;
  };
  run = () => {
    try {
      // @ts-ignore
      const ast = esprima.parseScript(this.code);
      this.onResultCb(ast);
    } catch (error) {
      this.onErrorCb(error.message);
    }

    this.onCompletedCb(this.code);
  };
}
