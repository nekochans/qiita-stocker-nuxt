module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: "module",
    project: './tsconfig.json',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'camelcase': 0,
    'vue/no-v-html': false,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0  }
}
