// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", ".expo/**"],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
  {
    files: ["**/__tests__/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        jest: "readonly",
      },
    },
    rules: {
      "import/first": "off",
    },
  },
  {
    files: ["jest.setup.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
      },
    },
  },
  prettierConfig,
]);
