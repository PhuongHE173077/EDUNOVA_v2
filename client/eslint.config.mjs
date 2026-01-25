// eslint.config.js (hoặc .ts nếu dùng TypeScript)
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tạo FlatCompat để tương thích cấu hình cũ (eslintrc)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Dùng các preset tương thích (Next.js chỉ có "next" và "next/core-web-vitals")
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Tắt rule không muốn cảnh báo
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
