module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: 'error',
    'react/jsx-indent-props': [2, 2], // 验证JSX中的props缩进
    'react/jsx-indent': [2, 2],
    'react/jsx-closing-bracket-location': [2, 'line-aligned'],
    'react/jsx-closing-tag-location': 2,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-curly-newline': 2,
    'react/jsx-curly-spacing': [2, { when: 'never', allowMultiline: false }],
    'react/jsx-max-props-per-line': [2, { maximum: { single: 3, multi: 1 } }],
    'react/jsx-props-no-multi-spaces': 2,
    'react/jsx-sort-default-props': [2],
    'react/jsx-sort-props': 2, // 强化props按字母排序
    'react/jsx-space-before-closing': [2, 'always'],
    'react/jsx-wrap-multilines': [2, {
      declaration: 'parens',
      assignment: 'parens',
      return: 'parens',
      arrow: 'parens',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore'
    }]

  }
}
