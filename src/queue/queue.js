export const fetcher = function (assets) {
  const queue = [];

  for (let asset of assets) {
    const split = asset.split('/');
    const key = split[split.length - 1];

    if (!window.localStorage.getItem(`testable.${key}`)) {
      queue.push(fetch(asset));
    }
  }

  return Promise.all(queue).then(data => {
    for (let response of data) {
      response.blob()
        .then(blob => {
          const reader = new FileReader();
          reader.addEventListener('load', function () {
            const file = response.url.split('/');
            const key = `testable.${file[file.length - 1]}`;

            window.localStorage.setItem(key, this.result);
          });

          reader.readAsDataURL(blob);
        });
    }
  });
};
