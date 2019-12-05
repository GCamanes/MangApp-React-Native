module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'react/forbid-prop-types': 'off',
    'max-len': 'off',
    'padded-blocks': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': ['.js', '.jsx']
      }
    ],
    'react/no-array-index-key': 'off',
  }
};
