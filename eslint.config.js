import vueTsConfig from '@vue/eslint-config-typescript'
import prettierConfig from '@vue/eslint-config-prettier'

export default [
  ...vueTsConfig(),
  prettierConfig,
  {
    ignores: ['dist', 'node_modules'],
  },
]
