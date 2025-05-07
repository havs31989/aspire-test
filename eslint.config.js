import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
        ],
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                parser: typescriptEslint.parser,
            },
        },
        rules: {
            // your rules
            "@typescript-eslint/no-this-alias": ["error", {
                "allowDestructuring": true,
                "allowedNames": ["me"]
            }],
            "vue/max-attributes-per-line": ["off"],
            "vue/html-self-closing": ["off"],
            "vue/singleline-html-element-content-newline": ["off"],
            "vue/order-in-components": ["off"],
            "vue/multi-word-component-names": ["off"]
        },
    },
);