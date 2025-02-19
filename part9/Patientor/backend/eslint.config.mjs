import eslint from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';

export default [
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  tsEslint.configs.strict,
  tsEslint.configs.stylistic,
  tsEslint.configs.recommendedTypeChecked,
  tsEslint.configs.strictTypeChecked,
  tsEslint.configs.stylisticTypeChecked,
];