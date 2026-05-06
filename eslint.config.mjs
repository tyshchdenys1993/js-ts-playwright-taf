import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default [
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
        },
    },
];
