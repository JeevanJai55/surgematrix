import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
export default tseslint.config(
  { ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"] },
  js.configs.recommended,
  { files: ["tests/**/*.mjs"], languageOptions: { globals: { fetch: "readonly", console: "readonly", URL: "readonly", Buffer: "readonly", process: "readonly", global: "readonly", Response: "readonly" } } },
  ...tseslint.configs.recommended,
  { files: ["**/*.{ts,tsx}"], plugins: { "react-hooks": reactHooks, "jsx-a11y": jsxA11y }, rules: { ...reactHooks.configs.recommended.rules, ...jsxA11y.configs.recommended.rules, "jsx-a11y/anchor-is-valid": "off" }, settings: { "jsx-a11y": { components: { Link: "a" } } } }
);



