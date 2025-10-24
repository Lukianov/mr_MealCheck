module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  ignorePatterns: ['dist', 'node_modules'],
}
