// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from 'node:path';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import headerPlugin from '@tony.ganchev/eslint-plugin-header';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import promisePlugin from 'eslint-plugin-promise';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const stylisticDefaultOptions = {
	indent: 'tab',
	semi: true,
	commaDangle: 'never',
	braceStyle: '1tbs',
	'operator-linebreak': 'after',
	'arrow-parens': 'as-needed',
	'quote-props': 'as-needed'
};

const commonJsRules = {
	'accessor-pairs': ['error'],
	'array-bracket-newline': ['off'],
	'array-bracket-spacing': ['error'],
	'array-element-newline': ['off'],
	'arrow-body-style': ['error'],
	'arrow-parens': ['error', 'as-needed'],
	'arrow-spacing': ['error'],
	'block-scoped-var': ['error'],
	'block-spacing': ['error'],
	'brace-style': ['off'],
	'callback-return': ['off'],
	camelcase: ['error'],
	'capitalized-comments': ['off'],
	'class-methods-use-this': ['off'],
	'comma-dangle': ['error', 'never'],
	'comma-spacing': ['off'],
	'comma-style': ['error'],
	complexity: ['off'],
	'computed-property-spacing': ['error'],
	'consistent-return': ['off'],
	'consistent-this': ['error'],
	'constructor-super': ['off'],
	curly: ['error'],
	'default-case': ['off'],
	'default-param-last': ['off'],
	'dot-location': ['error', 'property'],
	'dot-notation': ['off'],
	'eol-last': ['error'],
	eqeqeq: ['error'],
	'for-direction': ['error'],
	'func-call-spacing': ['off'],
	'func-name-matching': ['error'],
	'func-names': ['error'],

	'func-style': [
		'error',
		'declaration',
		{
			allowArrowFunctions: true
		}
	],

	'function-call-argument-newline': ['off'],
	'function-paren-newline': ['off'],
	'generator-star-spacing': ['error'],
	'getter-return': ['off'],
	'grouped-accessor-pairs': ['error'],
	'guard-for-in': ['off'],
	'id-blacklist': ['error'],
	'id-length': ['off'],
	'id-match': ['error'],
	'implicit-arrow-linebreak': ['off'],
	'import/default': ['error'],
	'import/export': ['error'],
	'import/named': ['off'],
	'import/namespace': ['off'],
	'import/no-duplicates': ['error'],
	'import/no-extraneous-dependencies': ['off'],
	'import/no-named-as-default': ['error'],
	'import/no-named-as-default-member': ['error'],
	'import/no-unresolved': ['off'],
	'import/no-unused-modules': ['off'],

	'import/order': [
		'error',
		{
			groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],

			alphabetize: {
				order: 'asc',
				caseInsensitive: true
			}
		}
	],

	'import/prefer-default-export': ['off'],
	indent: ['off'],
	'init-declarations': ['off'],
	'jsx-quotes': ['error'],
	'key-spacing': ['error'],
	'keyword-spacing': ['off'],
	'line-comment-position': ['off'],
	'linebreak-style': ['error'],
	'lines-around-comment': ['off'],
	'lines-between-class-members': ['off'],
	'logical-assignment-operators': ['off'],
	'max-classes-per-file': ['error'],
	'max-depth': ['off'],

	'max-len': [
		'error',
		{
			ignorePattern: '^import',
			ignoreTemplateLiterals: true,
			ignoreStrings: true,
			ignoreComments: true,
			ignoreRegExpLiterals: true,
			code: 120
		}
	],

	'max-lines': ['off'],
	'max-lines-per-function': ['off'],
	'max-nested-callbacks': ['error'],
	'max-params': ['off'],
	'max-statements': ['off'],
	'max-statements-per-line': ['error'],
	'multiline-comment-style': ['off'],
	'multiline-ternary': ['off'],
	'new-cap': ['off'],
	'new-parens': ['error'],
	'newline-per-chained-call': ['off'],
	'no-alert': ['error'],
	'no-array-constructor': ['off'],
	'no-async-promise-executor': ['error'],
	'no-await-in-loop': ['off'],
	'no-bitwise': ['error'],
	'no-caller': ['error'],
	'no-case-declarations': ['error'],
	'no-class-assign': ['error'],
	'no-compare-neg-zero': ['error'],
	'no-cond-assign': ['error'],
	'no-confusing-arrow': ['error'],
	'no-console': ['error'],
	'no-constant-binary-expression': ['error'],
	'no-const-assign': ['off'],
	'no-constant-condition': ['error'],
	'no-constructor-return': ['error'],
	'no-continue': ['error'],
	'no-control-regex': ['off'],
	'no-debugger': ['error'],
	'no-delete-var': ['error'],
	'no-div-regex': ['off'],
	'no-dupe-args': ['off'],
	'no-dupe-class-members': ['off'],
	'no-dupe-else-if': ['error'],
	'no-dupe-keys': ['off'],
	'no-duplicate-case': ['off'],
	'no-duplicate-imports': ['off'],
	'no-else-return': ['error'],
	'no-empty': ['off'],
	'no-empty-character-class': ['error'],
	'no-empty-function': ['off'],
	'no-empty-pattern': ['error'],
	'no-eq-null': ['error'],
	'no-eval': ['error'],
	'no-ex-assign': ['error'],
	'no-extend-native': ['error'],
	'no-extra-bind': ['error'],
	'no-extra-boolean-cast': ['error'],
	'no-extra-label': ['error'],
	'no-extra-parens': ['off'],
	'no-extra-semi': ['off'],
	'no-fallthrough': ['error'],
	'no-floating-decimal': ['error'],
	'no-func-assign': ['off'],
	'no-global-assign': ['error'],
	'no-implicit-coercion': ['error'],
	'no-implicit-globals': ['error'],
	'no-implied-eval': ['error'],
	'no-import-assign': ['off'],
	'no-inline-comments': ['off'],
	'no-inner-declarations': ['error'],
	'no-invalid-regexp': ['error'],
	'no-invalid-this': ['off'],
	'no-irregular-whitespace': ['error'],
	'no-iterator': ['error'],
	'no-label-var': ['error'],
	'no-labels': ['error'],
	'no-lone-blocks': ['error'],
	'no-lonely-if': ['error'],
	'no-loop-func': ['off'],
	'no-loss-of-precision': ['off'],
	'no-magic-numbers': ['off'],
	'no-misleading-character-class': ['error'],
	'no-mixed-operators': ['error'],
	'no-mixed-spaces-and-tabs': ['off'],
	'no-multi-assign': ['error'],
	'no-multi-spaces': ['error'],
	'no-multi-str': ['error'],
	'no-multiple-empty-lines': ['error'],
	'no-negated-condition': ['off'],
	'no-nested-ternary': ['off'],
	'no-new': ['error'],
	'no-new-func': ['error'],
	'no-new-object': ['error'],
	'no-new-symbol': ['off'],
	'no-new-wrappers': ['error'],
	'no-obj-calls': ['off'],
	'no-octal': ['error'],
	'no-octal-escape': ['error'],
	'no-param-reassign': ['off'],
	'no-plusplus': ['off'],
	'no-promise-executor-return': ['off'],
	'no-proto': ['error'],
	'no-prototype-builtins': ['error'],
	'no-redeclare': ['off'],
	'no-regex-spaces': ['error'],
	'no-restricted-globals': ['error'],
	'no-restricted-imports': ['error'],
	'no-restricted-properties': ['error'],

	'no-return-assign': ['error'],
	'no-return-await': ['off'],
	'no-script-url': ['error'],
	'no-self-assign': ['error'],
	'no-self-compare': ['error'],
	'no-sequences': ['error'],
	'no-setter-return': ['off'],
	'no-shadow': ['off'],
	'no-shadow-restricted-names': ['error'],
	'no-sparse-arrays': ['error'],

	'no-tabs': [
		'off',
		{
			allowIndentationTabs: true
		}
	],

	'no-template-curly-in-string': ['error'],
	'no-ternary': ['off'],
	'no-this-before-super': ['off'],
	'no-throw-literal': ['error'],
	'no-trailing-spaces': ['error'],
	'no-undef-init': ['error'],
	'no-undefined': ['off'],
	'no-undef': ['off'],
	'no-underscore-dangle': ['off'],
	'no-unexpected-multiline': ['error'],
	'no-unmodified-loop-condition': ['error'],
	'no-unneeded-ternary': ['error'],
	'no-unreachable': ['off'],
	'no-unsafe-finally': ['error'],
	'no-unsafe-negation': ['off'],
	'no-unused-expressions': ['off'],
	'no-unused-labels': ['error'],

	'no-unused-vars': [
		'error',
		{
			args: 'none'
		}
	],

	'no-use-before-define': ['off'],
	'no-useless-call': ['error'],
	'no-useless-catch': ['error'],
	'no-useless-computed-key': ['error'],
	'no-useless-concat': ['error'],
	'no-useless-constructor': ['off'],
	'no-useless-escape': ['error'],
	'no-useless-rename': ['error'],
	'no-useless-return': ['error'],
	'no-var': ['error'],
	'no-void': ['error'],
	'no-warning-comments': ['off'],
	'no-whitespace-before-property': ['error'],
	'no-with': ['error'],
	'nonblock-statement-body-position': ['error'],
	'object-curly-newline': ['error'],
	'object-curly-spacing': ['error', 'always'],
	'object-property-newline': ['off'],
	'object-shorthand': ['error'],
	'one-var': ['error', 'never'],
	'one-var-declaration-per-line': ['error'],
	'operator-assignment': ['error'],
	'operator-linebreak': ['error'],
	'padded-blocks': ['error', 'never'],
	'padding-line-between-statements': ['error'],
	'prefer-arrow-callback': ['error'],
	'prefer-const': ['error'],
	'prefer-destructuring': ['off'],
	'prefer-exponentiation-operator': ['off'],
	'prefer-named-capture-group': ['off'],
	'prefer-numeric-literals': ['error'],
	'prefer-object-spread': ['error'],
	'prefer-promise-reject-errors': ['error'],
	'prefer-regex-literals': ['error'],
	'prefer-rest-params': ['error'],
	'prefer-spread': ['error'],
	'prefer-template': ['error'],
	'quote-props': ['off'],
	quotes: ['off'],
	radix: ['error'],
	'require-atomic-updates': ['off'],
	'require-await': ['off'],
	'require-unicode-regexp': ['off'],
	'require-yield': ['error'],
	'rest-spread-spacing': ['error'],
	semi: ['off'],
	'semi-spacing': ['error'],
	'semi-style': ['error'],
	'sort-imports': ['off'],
	'sort-keys': ['off'],
	'sort-vars': ['error'],
	'space-before-blocks': ['error'],
	'space-before-function-paren': ['off'],
	'space-in-parens': ['error'],
	'space-infix-ops': ['error'],
	'space-unary-ops': ['error'],
	'spaced-comment': ['error'],
	strict: ['error'],
	'switch-colon-spacing': ['error'],
	'symbol-description': ['error'],
	'template-curly-spacing': ['error'],
	'template-tag-spacing': ['error'],
	'unicode-bom': ['error'],
	'promise/always-return': ['error'],
	'promise/no-return-wrap': ['error'],
	'promise/param-names': ['error'],
	'promise/catch-or-return': ['error'],
	'promise/no-multiple-resolved': ['error'],
	'promise/no-nesting': ['error'],
	'promise/no-promise-in-callback': ['error'],
	'promise/no-callback-in-promise': ['error'],
	'promise/no-new-statics': ['error'],
	'promise/no-return-in-finally': ['error'],
	'promise/prefer-await-to-then': ['error'],
	'promise/valid-params': ['error'],
	'unicorn/better-regex': ['error'],
	'unicorn/catch-error-name': ['off'],
	'unicorn/consistent-function-scoping': ['error'],
	'unicorn/custom-error-definition': ['off'],
	'unicorn/empty-brace-spaces': ['off'],
	'unicorn/error-message': ['error'],
	'unicorn/escape-case': ['error'],
	'unicorn/expiring-todo-comments': ['error'],
	'unicorn/explicit-length-check': ['off'],
	'unicorn/filename-case': ['off'],
	'unicorn/import-style': ['error'],
	'unicorn/new-for-builtins': ['error'],
	'unicorn/no-abusive-eslint-disable': ['error'],
	'unicorn/no-array-push-push': ['off'],
	'unicorn/no-console-spaces': ['error'],
	'unicorn/no-for-loop': ['off'],
	'unicorn/no-hex-escape': ['error'],
	'unicorn/no-keyword-prefix': ['off'],
	'unicorn/no-negated-condition': ['off'],
	'unicorn/no-nested-ternary': ['error'],
	'unicorn/no-new-buffer': ['error'],
	'unicorn/no-null': ['off'],
	'unicorn/no-process-exit': ['error'],
	'unicorn/no-reduce': ['off'],
	'unicorn/no-unreadable-array-destructuring': ['error'],
	'unicorn/no-unsafe-regex': ['off'],
	'unicorn/no-unused-properties': ['off'],
	'unicorn/no-useless-undefined': ['error'],
	'unicorn/no-zero-fractions': ['error'],
	'unicorn/number-literal-case': ['off'],
	'unicorn/numeric-separators-style': ['off'],
	'unicorn/prefer-at': ['off'],
	'unicorn/prefer-add-event-listener': ['error'],
	'unicorn/prefer-code-point': ['off'],
	'unicorn/prefer-includes': ['error'],
	'unicorn/prefer-json-parse-buffer': ['off'],
	'unicorn/prefer-modern-dom-apis': ['error'],
	'unicorn/prefer-module': ['off'],
	'unicorn/prefer-negative-index': ['error'],
	'unicorn/prefer-node-protocol': ['error'],
	'unicorn/prefer-number-properties': ['error'],
	'unicorn/prefer-optional-catch-binding': ['error'],
	'unicorn/prefer-query-selector': ['error'],
	'unicorn/prefer-reflect-apply': ['error'],
	'unicorn/prefer-set-has': ['off'],
	'unicorn/prefer-spread': ['off'],
	'unicorn/prefer-string-replace-all': ['off'],
	'unicorn/prefer-string-slice': ['error'],
	'unicorn/prefer-switch': ['off'],
	'unicorn/prefer-top-level-await': ['off'],
	'unicorn/prefer-ternary': ['off'],
	'unicorn/prefer-type-error': ['error'],
	'unicorn/prevent-abbreviations': ['off'],
	'unicorn/string-content': ['off'],
	'unicorn/switch-case-braces': ['off'],
	'unicorn/throw-new-error': ['error'],
	'use-isnan': ['error'],
	'valid-typeof': ['off'],
	'vars-on-top': ['error'],
	'wrap-iife': ['error'],
	'wrap-regex': ['off'],
	'yield-star-spacing': ['error'],
	yoda: ['error'],
	'jsdoc/check-access': 'error',
	'jsdoc/check-alignment': 'error',
	'jsdoc/check-examples': 'off',
	'jsdoc/check-indentation': 'error',
	'jsdoc/check-line-alignment': 'error',
	'jsdoc/check-param-names': 'error',
	'jsdoc/check-property-names': 'error',
	'jsdoc/check-syntax': 'error',
	'jsdoc/check-tag-names': 'error',
	'jsdoc/check-types': 'error',
	'jsdoc/check-values': 'error',
	'jsdoc/empty-tags': 'error',
	'jsdoc/implements-on-classes': 'error',
	'jsdoc/match-description': ['error'],

	'jsdoc/multiline-blocks': [
		'error',
		{
			noSingleLineBlocks: true
		}
	],

	'jsdoc/newline-after-description': 'off',
	'jsdoc/no-bad-blocks': 'error',
	'jsdoc/no-defaults': 'error',
	'jsdoc/no-types': 'error',
	'jsdoc/no-undefined-types': 'error',
	'jsdoc/require-asterisk-prefix': 'error',
	'jsdoc/require-description': 'error',
	'jsdoc/require-description-complete-sentence': 'off',
	'jsdoc/require-example': 'off',
	'jsdoc/require-file-overview': 'off',
	'jsdoc/require-hyphen-before-param-description': 'off',

	'jsdoc/require-jsdoc': [
		'error',
		{
			require: {
				ArrowFunctionExpression: false,
				ClassDeclaration: true,
				ClassExpression: true,
				FunctionDeclaration: true,
				FunctionExpression: true,
				MethodDefinition: true
			},

			contexts: [
				'FunctionDeclaration',
				'FunctionExpression',
				'MethodDefinition',
				'TSDeclareFunction',
				'TSEnumDeclaration',
				'TSInterfaceDeclaration',
				'TSMethodDeclaration',
				'TSMethodSignature',
				'TSPropertySignature:not(TSTypeLiteral > TSPropertySignature)',
				'TSTypeAliasDeclaration'
			]
		}
	],

	'jsdoc/require-param': [
		'error',
		{
			contexts: [
				'FunctionDeclaration',
				'FunctionExpression',
				'MethodDefinition',
				'TSDeclareFunction',
				'TSMethodDeclaration',
				'TSMethodSignature'
			]
		}
	],

	'jsdoc/require-param-description': 'error',
	'jsdoc/require-param-name': 'error',
	'jsdoc/require-param-type': 'off',
	'jsdoc/require-property': 'error',
	'jsdoc/require-property-description': 'error',
	'jsdoc/require-property-name': 'error',
	'jsdoc/require-property-type': 'error',

	'jsdoc/require-returns': [
		'error',
		{
			contexts: [
				'FunctionDeclaration',
				'FunctionExpression',
				'MethodDefinition',
				'TSDeclareFunction',
				'TSMethodDeclaration',
				'TSMethodSignature'
			]
		}
	],

	'jsdoc/require-returns-check': 'error',
	'jsdoc/require-returns-description': 'error',
	'jsdoc/require-returns-type': 'off',
	'jsdoc/require-throws': 'error',
	'jsdoc/require-yields': 'error',
	'jsdoc/require-yields-check': 'error',
	'jsdoc/valid-types': 2,

	'header/header': [
		2,
		'line',
		[' Copyright 2024 IOTA Stiftung.', ' SPDX-License-Identifier: Apache-2.0.']
	]
};

const commonTsRules = {
	'no-restricted-syntax': [
		'error',
		{
			selector: "NewExpression[callee.name='Error']",
			message:
				'new Error is disallowed as it is not specific enough, and bypasses the i18n formatting'
		},
		{
			selector: String.raw`ImportDeclaration[source.value=/\.$/]`,
			message:
				'Importing from paths ending in "." are not allowed, use specific file import instead to avoid circular dependencies'
		},
		{
			selector: String.raw`ImportDeclaration[source.value=/\..src$/]`,
			message:
				'Importing from paths ending in "/src" are not allowed, use specific file import instead to avoid circular dependencies'
		},
		{
			selector: 'PropertyDefinition[value!=null][static=false][key.name!=CLASS_NAME]',
			message:
				'Do not use property initializers inline, perform the initialization in the constructor instead'
		},
		{
			selector: 'TSEnumDeclaration',
			message: 'Do not use enums, instead use iterable union types'
		}
	],
	'@typescript-eslint/adjacent-overload-signatures': ['error'],
	'@typescript-eslint/array-type': ['error'],
	'@typescript-eslint/await-thenable': ['error'],
	'@typescript-eslint/ban-ts-comment': ['error'],
	'@typescript-eslint/ban-tslint-comment': ['off'],
	'@typescript-eslint/brace-style': ['off'],
	'@typescript-eslint/class-literal-property-style': ['error'],
	'@typescript-eslint/no-confusing-void-expression': ['off'],
	'@typescript-eslint/consistent-generic-constructors': ['error'],
	'@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
	'@typescript-eslint/consistent-type-assertions': ['error'],
	'@typescript-eslint/consistent-type-definitions': ['error'],

	'@typescript-eslint/consistent-type-imports': [
		'error',
		{
			fixStyle: 'inline-type-imports'
		}
	],

	'@typescript-eslint/object-curly-spacing': ['off'],
	'@typescript-eslint/default-param-last': ['error'],
	'@typescript-eslint/dot-notation': ['error'],

	'@typescript-eslint/explicit-function-return-type': [
		'error',
		{
			allowExpressions: true
		}
	],

	'@typescript-eslint/explicit-member-accessibility': [
		'error',
		{
			overrides: {
				constructors: 'no-public'
			}
		}
	],

	'@typescript-eslint/explicit-module-boundary-types': ['off'],
	'@typescript-eslint/indent': ['off'],
	'@typescript-eslint/init-declarations': ['off'],
	'@typescript-eslint/keyword-spacing': ['off'],
	'@typescript-eslint/lines-around-comment': ['off'],
	'@typescript-eslint/member-ordering': ['error'],
	'@typescript-eslint/method-signature-style': ['off'],

	'@typescript-eslint/naming-convention': [
		'error',
		{
			selector: 'variable',
			format: ['camelCase', 'UPPER_CASE']
		},
		{
			selector: 'enumMember',
			format: ['PascalCase']
		},
		{
			selector: 'property',
			modifiers: ['static'],
			leadingUnderscore: 'forbid',
			format: ['UPPER_CASE']
		},
		{
			selector: 'property',
			modifiers: ['private'],
			leadingUnderscore: 'require',
			format: ['camelCase']
		},
		{
			selector: 'property',
			modifiers: ['static', 'private'],
			leadingUnderscore: 'require',
			format: ['UPPER_CASE', 'camelCase']
		}
	],

	'@typescript-eslint/no-array-constructor': ['error'],
	'@typescript-eslint/no-base-to-string': ['error'],
	'@typescript-eslint/no-dupe-class-members': ['error'],

	'@typescript-eslint/no-duplicate-type-constituents': [
		'error',
		{
			ignoreUnions: true
		}
	],

	'@typescript-eslint/no-dynamic-delete': ['off'],
	'@typescript-eslint/no-empty-function': ['off'],
	'@typescript-eslint/no-empty-interface': ['error'],
	'@typescript-eslint/no-explicit-any': ['error'],
	'@typescript-eslint/no-extra-non-null-assertion': ['error'],
	'@typescript-eslint/no-extra-parens': ['off'],
	'@typescript-eslint/no-extraneous-class': ['off'],
	'@typescript-eslint/no-floating-promises': ['error'],
	'@typescript-eslint/no-for-in-array': ['error'],
	'@typescript-eslint/no-implied-eval': ['error'],
	'@typescript-eslint/no-import-type-side-effects': ['error'],
	'@typescript-eslint/no-inferrable-types': ['off'],
	'@typescript-eslint/no-invalid-this': ['off'],
	'@typescript-eslint/no-invalid-void-type': ['error'],
	'@typescript-eslint/no-loop-func': ['off'],
	'@typescript-eslint/no-magic-numbers': ['off'],
	'@typescript-eslint/no-misused-new': ['error'],

	'@typescript-eslint/no-misused-promises': [
		'error',
		{
			checksVoidReturn: false
		}
	],

	'@typescript-eslint/no-namespace': ['error'],
	'@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
	'@typescript-eslint/no-non-null-assertion': ['error'],
	'@typescript-eslint/no-redundant-type-constituents': ['off'],
	'@typescript-eslint/no-require-imports': ['error'],
	'@typescript-eslint/no-shadow': ['error'],
	'@typescript-eslint/no-this-alias': ['error'],
	'@typescript-eslint/no-type-alias': ['off'],
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
	'@typescript-eslint/no-unnecessary-condition': ['off'],
	'@typescript-eslint/no-unnecessary-qualifier': ['error'],
	'@typescript-eslint/no-unnecessary-type-arguments': ['error'],
	'@typescript-eslint/no-unnecessary-type-assertion': ['error'],
	'@typescript-eslint/no-unsafe-argument': ['off'],
	'@typescript-eslint/no-unsafe-assignment': ['off'],
	'@typescript-eslint/no-unsafe-call': ['off'],
	'@typescript-eslint/no-unsafe-member-access': ['off'],
	'@typescript-eslint/no-unsafe-return': ['off'],
	'@typescript-eslint/no-unsafe-enum-comparison': ['off'],
	'@typescript-eslint/no-unused-expressions': ['error'],

	'@typescript-eslint/no-unused-vars': [
		'error',
		{
			args: 'none'
		}
	],

	'@typescript-eslint/no-unused-vars-experimental': ['off'],
	'@typescript-eslint/no-use-before-define': ['off'],
	'@typescript-eslint/no-useless-constructor': ['error'],
	'@typescript-eslint/no-var-requires': ['error'],
	'@typescript-eslint/only-throw-error': ['error'],
	'@typescript-eslint/prefer-as-const': ['error'],
	'@typescript-eslint/prefer-for-of': ['off'],
	'@typescript-eslint/prefer-function-type': ['error'],
	'@typescript-eslint/prefer-includes': ['error'],
	'@typescript-eslint/prefer-namespace-keyword': ['error'],

	'@typescript-eslint/prefer-nullish-coalescing': [
		'error',
		{
			ignoreConditionalTests: true
		}
	],

	'@typescript-eslint/prefer-optional-chain': ['error'],
	'@typescript-eslint/prefer-readonly': ['error'],
	'@typescript-eslint/prefer-readonly-parameter-types': ['off'],
	'@typescript-eslint/prefer-reduce-type-parameter': ['error'],
	'@typescript-eslint/prefer-regexp-exec': ['error'],
	'@typescript-eslint/prefer-string-starts-ends-with': ['error'],
	'@typescript-eslint/prefer-ts-expect-error': ['error'],
	'@typescript-eslint/promise-function-async': ['error'],
	'@typescript-eslint/require-array-sort-compare': ['off'],
	'@typescript-eslint/require-await': ['off'],
	'@typescript-eslint/restrict-plus-operands': ['error'],
	'@typescript-eslint/restrict-template-expressions': ['off'],
	'@typescript-eslint/return-await': ['error'],
	'@typescript-eslint/sort-type-constituents': ['off'],
	'@typescript-eslint/strict-boolean-expressions': ['off'],
	'@typescript-eslint/switch-exhaustiveness-check': ['error'],
	'@typescript-eslint/triple-slash-reference': ['error'],

	'@typescript-eslint/typedef': [
		'error',
		{
			arrowParameter: false
		}
	],

	'@typescript-eslint/unbound-method': ['error'],
	'@typescript-eslint/unified-signatures': ['error']
};

export default defineConfig([
	globalIgnores(['**/dist/', '**/coverage/', '**/rollup.config.mjs', '**/vitest.config.ts*']),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				project: path.join(import.meta.dirname, 'tsconfig.eslint.json'),
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			promise: promisePlugin,
			jsdoc: jsdocPlugin,
			'simple-import-sort': simpleImportSortPlugin,
			'unused-imports': unusedImportsPlugin,
			header: headerPlugin,
			stylistic,
			import: importPlugin,
			unicorn: unicornPlugin
		},
		settings: {
			jsdoc: {
				ignoreInternal: true,
				mode: 'typescript'
			}
		}
	},
	{
		...eslint.configs.recommended,
		...eslint.configs.all,
		...unicornPlugin.configs.recommended,
		...importPlugin.flatConfigs.recommended,
		...promisePlugin.configs['flat/recommended'],
		...jsdocPlugin.configs['flat/recommended'],
		...stylistic.configs.customize({
			quotes: 'single',
			...stylisticDefaultOptions
		}),
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: path.join(import.meta.dirname, 'tsconfig.eslint.json'),
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
		rules: commonJsRules
	},
	...tseslint.configs.recommendedTypeChecked.map(config => ({
		...eslint.configs.recommended,
		...eslint.configs.all,
		...unicornPlugin.configs.recommended,
		...importPlugin.flatConfigs.recommended,
		...promisePlugin.configs['flat/recommended'],
		...jsdocPlugin.configs['flat/recommended'],
		...stylistic.configs.customize({
			quotes: 'double',
			...stylisticDefaultOptions
		}),
		...config,
		files: ['**/*.ts', '**/*.mts', '**/*.cts'],
		rules: {
			...commonJsRules,
			...commonTsRules
		}
	})),
	...tseslint.configs.recommendedTypeChecked.map(config => ({
		...eslint.configs.recommended,
		...eslint.configs.all,
		...unicornPlugin.configs.recommended,
		...importPlugin.flatConfigs.recommended,
		...promisePlugin.configs['flat/recommended'],
		...jsdocPlugin.configs['flat/recommended'],
		...stylistic.configs.customize({
			quotes: 'double',
			...stylisticDefaultOptions
		}),
		...config,
		files: ['**/setupTestEnv.ts', '**/*.spec.ts'],
		rules: {
			...commonJsRules,
			...commonTsRules,
			'no-console': ['off'],
			'unicorn/no-useless-undefined': ['off']
		}
	}))
]);
