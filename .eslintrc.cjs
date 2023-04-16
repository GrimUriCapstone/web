module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "tailwindcss/no-custom-classname": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-misused-promises": 0,
  },
};
