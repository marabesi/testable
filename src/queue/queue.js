export default class Queue {
  prefix = 'testable.'

  /**
   * @param {FileReader} reader
   */
  set reader(reader) {
    this.fileReader = reader;
  }

  /**
   * @returns FileReader
   */
  get reader() {
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

  fetch(assets) {
    const queue = [];

    for (let asset of assets) {
      const split = asset.split('/');
      const key = split[split.length - 1];

      if (!this.storage.getItem(`testable.${key}`)) {
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

  extractFileName(response) {
    const file = response.url.split('/');
    return `testable.${file[file.length - 1]}`;
  }

  storeFile(response, blob) {
    const key = this.extractFileName(response);
    const reader = this.reader;
    const context = this;

    reader.onload = function() {
      context.storage.setItem(key, this.result);
    };

    reader.readAsDataURL(blob);
  }
}

Queue.reader = FileReader;

Queue.storage = localStorage;

