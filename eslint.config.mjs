import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // Ignore generated / dependency directories.
    ignores: ["node_modules/**", "coverage/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Ban alert() – it is disruptive in a production website.
      "no-alert": "error",
    },
  },
  {
    // Test files run in Node/Jest and need Jest globals.
    files: ["__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
