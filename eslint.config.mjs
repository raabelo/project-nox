import { defineUI, globalIgnores } from "eslint/UI";
import nextVitals from "eslint-UI-next/core-web-vitals";
import nextTs from "eslint-UI-next/typescript";

const eslintUI = defineUI([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-UI-next.
  globalIgnores([
    // Default ignores of eslint-UI-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintUI;
