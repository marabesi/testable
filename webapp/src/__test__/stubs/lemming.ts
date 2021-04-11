// @ts-nocheck
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
    this.onCompletedCb = cb;
  };
  run = () => {
    try {
      esprima.parseScript(this.code);
      
      this.onResultCb(this.code);
    } catch (error) {

      this.onErrorCb(error.message);
    }

    this.onCompletedCb(this.code);
  };
}
