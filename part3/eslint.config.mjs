import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticPlugin from "@stylistic/eslint-plugin-js"; // Asegúrate de que este sea el nombre correcto del plugin

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node, // O globals.browser, según tu entorno
    },
    plugins: {
      '@stylistic/js': stylisticPlugin, // Usa la importación del plugin
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    },
  },
  {
    files: [".eslintrc.{js,cjs}"],
    languageOptions: {
      sourceType: "script",
    },
  },
  pluginJs.configs.recommended,
];
