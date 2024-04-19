// eslint.config.js
import js from '@eslint/js';

export default [
  js.configs.all,
  {
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
