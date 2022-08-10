module.exports = {
    root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		node: true
	},
    rules: {
        "array-callback-return": "error",
        "no-await-in-loop": "warn",
        "no-constant-binary-expression": "error",
        "no-constructor-return": "error",
        "no-control-regex": "warn",
        "no-promise-executor-return": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "warn",
        "no-unmodified-loop-condition": "error",
        "no-unreachable-loop": "error",
        "no-unused-private-class-members": "warn",
        "camelcase": "warn",
        "consistent-return": "warn",
        "curly": ["error", "multi-line"],
        "eqeqeq": "error",
        "no-caller": "error",
        "no-floating-decimal": "error",
        "no-lonely-if": "warn",
        "no-shadow": "error",
        "no-var": "error",
        "no-void": "error",
        "prefer-const": "warn",
    },
}