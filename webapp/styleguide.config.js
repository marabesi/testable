const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, 'src/css/index.css')
  ],
  styleguideDir: './public/docs',
  exampleMode: 'expand',
  components: 'src/components/**/*.{js,jsx,ts,tsx}',
  ignore: [
    '**/*.spec.{js,jsx,ts,tsx}',
    'src/components/app/**',
    '**/**/types.{ts,js}',
    '**/**/index.{ts,js}'
  ],
  sections: [
    {
      name: 'User Interface',
      components: 'src/components/ui/interface/**/*.{js,tsx}',
      exampleMode: 'expand',
      usageMode: 'expand'
    },
    {
      name: 'Icons',
      components: 'src/components/ui/icons/**/*.{js,tsx}',
      exampleMode: 'expand',
      usageMode: 'expand'
    },
    {
      name: 'Images',
      components: 'src/components/ui/images/**/*.{js,tsx}',
      exampleMode: 'expand',
      usageMode: 'expand'
    },
  ]
};