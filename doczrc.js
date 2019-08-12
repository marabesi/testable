export default {
  dest: 'build/docz',
  files: '**/*.{markdown,mdx}',
  onCreateWebpackChain: (config) => {
    config.module
      .rule('scss')
      .test(/\.css|scss|sass$/)
      .use('style')
      .loader('style-loader')
      .end()
      .use('css')
      .loader('css-loader')
      .end();
  },
};