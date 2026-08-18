import { globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const nextCore = nextPlugin.configs["core-web-vitals"];
const tsRecommended = tsPlugin.configs.recommended;

export default [
  {
    name: "next/core-web-vitals",
    plugins: { "@next/next": nextPlugin },
    rules: nextCore.rules,
  },
  {
    name: "next/typescript",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...tsRecommended.rules,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/no-unused-expressions": 1,
    },
  },
  globalIgnores([".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts"]),
];