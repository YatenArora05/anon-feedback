import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "no-unused-vars": "off", // turn off JS unused vars
      "@typescript-eslint/no-unused-vars": "off", // turn off TS unused vars/imports
      "@typescript-eslint/no-explicit-any": "off", // allow 'any' type
    },
  },
];

export default eslintConfig;
