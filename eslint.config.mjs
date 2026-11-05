import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist/**", "docs/**", "public/**", ".hallmark/**", ".kilo/**", ".hermes-build-spec/**"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // A leading underscore marks an argument or rest-sibling that is deliberately unused.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      // shortcut: Estimator reads a ref in render for the stepper's roll direction. Warn until it moves to state.
      "react-hooks/refs": "warn",
    },
  },
  {
    files: ["scripts/**/*.{ts,mjs}", "vite.config.ts"],
    languageOptions: { globals: globals.node },
  },
  prettier,
);
