module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      parserOptions: {
        ecmaVersion: "latest",
      },
      plugins: ["@typescript-eslint"],
      rules: {},
    },
    {
      files: ["**/*.js"],
      extends: ["eslint:recommended"],
      parserOptions: {
        ecmaVersion: 2021,
      },
      rules: {},
    },
  ],
};
