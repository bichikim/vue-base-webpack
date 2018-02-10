module.exports = {
  root: true,
  // for reading typescript
  plugins: ['html', 'vue', 'typescript'],
  'env': {
    'browser': true,
    'es6': true,
    'amd': true,
  },
  // using eslint and vue recommended pre set
  'extends': ['eslint:recommended', 'plugin:vue/recommended'],
  'parserOptions': {
    'parser': 'typescript-eslint-parser',
    'sourceType': 'module',
  },
  'rules': {
    // vue options
    'no-async-in-computed-properties': 'off',
    'no-dupe-keys': 'error',
    // 'vue/require-default-prop': 'off',
    "vue/max-attributes-per-line": ['error', {
      "singleline": 5,
      "multiline": {
        "max": 3,
        "allowFirstLine": false,
      },
    }],
    // 'vue/jsx-uses-vars': 'error',
    // common javascript options
    'max-len': ['error', 100],
    // 'indent': ['error', 2],
    'camelcase': ['error', {'properties': 'always'}], // need to check to working well
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    // 'sort-keys': 'error',
    'no-console': 'error',
    // spacing options
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'space-before-blocks': ['error', {
      'functions': 'always',
      'keywords': 'never',
      'classes': 'always',
    }],
    'block-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'keyword-spacing': ['error', {
      'before': false,
      'after': false,
      'overrides': {
        'const' : {before: true, after: true},
        'from': {before: true, after: true},
        'import': {before: true, after: true},
        'as': {before: true, after: true},
        'export': {after: true},
        'return': {before: true, after: true},
        'this': {before: true, after: true},
        'case':{after: true},
        'extends': {before: true},
        'implements': {before: true},
      },
    }],
    // code style options
    'func-style': ['error', 'declaration', {'allowArrowFunctions': true}],
    'comma-style': ['error', 'last'],
    // 'linebreak-style': ['error', 'unix'],
    // type script options

    'typescript/class-name-casing': 'error',
    'typescript/interface-name-prefix': ['error', 'always'],
    'typescript/member-naming': ['error', {'private': '^_'}],
    'typescript/no-angle-bracket-type-assertion': 'error',
    'typescript/no-array-constructor': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-parameter-properties': 'error',
    'typescript/no-triple-slash-reference': 'error',
    'typescript/no-unused-vars': 'error',
    'typescript/type-annotation-spacing': ['error', {
      'before': false,
      'after': false,
      'overrides': {
        'arrow': {'before': true, 'after': true},
        'colon': {'before': false, 'after': true},
      },
    }],
    // off options
    'indent': 'off', // owing to a typescript-eslint-parser error
    'one-var': 'off',
    'no-undef': 'off', // off because of typescript-eslint-parser error
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/explicit-member-accessibility': 'off',
    'typescript/member-delimiter-style': 'off',
    'typescript/member-ordering': 'off',
    'typescript/no-empty-interface': 'off',
    'typescript/no-explicit-any': 'off',
    'typescript/no-type-alias': 'off',
    'typescript/no-use-before-define ': 'off',
  },
};
