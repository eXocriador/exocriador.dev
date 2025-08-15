import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", ".vite", "node_modules"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: "readonly",
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly"
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" }
      ],
      "react/prop-types": "off", // We use TypeScript for prop validation
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "no-undef": "off", // TypeScript handles this
      "no-prototype-builtins": "off", // Common in libraries
      "no-constant-condition": "off", // Common in libraries
      "no-cond-assign": "off", // Common in libraries
      "no-fallthrough": "off", // Common in libraries
      "no-empty": "off", // Common in libraries
      "no-func-assign": "off", // Common in libraries
      "no-reachable": "off", // Common in libraries
      "no-unsafe-finally": "off", // Common in libraries
      "no-control-regex": "off", // Common in libraries
      "no-misleading-character-class": "off", // Common in libraries
      "no-useless-escape": "off", // Common in libraries
      "getter-return": "off", // Common in libraries
      "valid-typeof": "off" // Common in libraries
    }
  }
]);
