export default class Queue {
  prefix = 'testable.'
  fileReader = new FileReader()
  localStorage = window.localStorage
  result = new ArrayBuffer(0);

  set reader(reader: FileReader) {
    this.fileReader = reader;
  }

  get reader(): FileReader {
    if (!this.fileReader) {
      return new FileReader();
    }

    return this.fileReader;
  }

  set storage(localStorage) {
    this.localStorage = localStorage;
  }

  get storage() {
    if (!this.localStorage) {
      return window.localStorage;
    }

    return this.localStorage;
  }

  clearStorage(assets: string[]) {
    for (let asset of assets) {
      const assetName = this.generateNameToStore(asset);
      this.storage.removeItem(assetName);
    }
  }

  generateNameToStore(asset: string) {
    const split = asset.split('/');
    const key = split[split.length - 1];
    return `testable.${key}`;
  }

  fetch(assets: string[]) {
    const queue = [];

    for (let asset of assets) {
      const assetName = this.generateNameToStore(asset);
      if (!this.storage.getItem(assetName)) {
        queue.push(fetch(asset));
      }
    }

    return Promise.all(queue).then(data => {
      for (let response of data) {
        response.blob()
          .then(blob => this.storeFile(response, blob));
      }
    });
  }

  extractFileName(response: Response) {
    const file = response.url.split('/');
    return `testable.${file[file.length - 1]}`;
  }

  storeFile(response: any, blob: any) {
    const key = this.extractFileName(response);
    const reader = this.reader;
    const context = this;

    reader.onload = function() {
      // @ts-ignore
      context.storage.setItem(key, this.result);
    };

    reader.readAsDataURL(blob);
  }
}

// @ts-ignore
Queue.reader = FileReader;
// @ts-ignore
Queue.storage = localStorage;