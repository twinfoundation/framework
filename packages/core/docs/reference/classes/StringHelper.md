# Class: StringHelper

Class to help with string.

## Constructors

### new StringHelper()

> **new StringHelper**(): [`StringHelper`](StringHelper.md)

#### Returns

[`StringHelper`](StringHelper.md)

## Methods

### trimTrailingSlashes()

> `static` **trimTrailingSlashes**(`value`): `string`

Trim trailing slashes from a string.

#### Parameters

• **value**: `undefined` \| `string`

The value to trim.

#### Returns

`string`

The trimmed value.

***

### trimLeadingSlashes()

> `static` **trimLeadingSlashes**(`value`): `string`

Trim leading slashes from a string.

#### Parameters

• **value**: `undefined` \| `string`

The value to trim.

#### Returns

`string`

The trimmed value.

***

### kebabCase()

> `static` **kebabCase**(`input`, `stripInterfacePrefix`): `string`

Convert the input string to kebab case.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean` = `true`

Strip interface prefixes.

#### Returns

`string`

The kebab case version of the input.

***

### snakeCase()

> `static` **snakeCase**(`input`, `stripInterfacePrefix`): `string`

Convert the input string to snake case.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean` = `true`

Strip interface prefixes.

#### Returns

`string`

The snake case version of the input.

***

### titleCase()

> `static` **titleCase**(`input`, `stripInterfacePrefix`): `string`

Title case all the words.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean` = `true`

Strip interface prefixes.

#### Returns

`string`

The title case version of the input.

***

### pascalCase()

> `static` **pascalCase**(`input`, `stripInterfacePrefix`): `string`

Pascal case all the words.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean` = `true`

Strip interface prefixes.

#### Returns

`string`

The pascal case version of the input.

***

### camelCase()

> `static` **camelCase**(`input`, `stripInterfacePrefix`): `string`

Camel case all the words.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean` = `true`

Strip interface prefixes.

#### Returns

`string`

The camel case version of the input.

***

### wordPath()

> `static` **wordPath**(`input`, `stripInterfacePrefix`): `string`

Convert the words to a path.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean` = `true`

Strip interface prefixes.

#### Returns

`string`

The path version of the input.

***

### stripPrefix()

> `static` **stripPrefix**(`input`): `string`

Strip interface prefix if there is one.

#### Parameters

• **input**: `string`

The input to strip.

#### Returns

`string`

The input with any interface prefix stripped.

***

### words()

> `static` **words**(`input`): `string`[]

Split a string into words.

#### Parameters

• **input**: `string`

The input to split.

#### Returns

`string`[]

The string split into words.

***

### isUtf8()

> `static` **isUtf8**(`data`): `boolean`

Check if a Node.js Buffer or Uint8Array is UTF-8.
Url https://tools.ietf.org/html/rfc3629
Source https://github.com/hcodes/isutf8
UTF8-char = UTF8-1 / UTF8-2 / UTF8-3 / UTF8-4.
UTF8-1    = %x00-7F.
UTF8-2    = %xC2-DF UTF8-tail.
UTF8-3    = %xE0 %xA0-BF UTF8-tail.
-           %xE1-EC 2( UTF8-tail ).
-           %xED %x80-9F UTF8-tail.
-           %xEE-EF 2( UTF8-tail ).
UTF8-4    = %xF0 %x90-BF 2( UTF8-tail ).
-           %xF1-F3 3( UTF8-tail ).
-           %xF4 %x80-8F 2( UTF8-tail ).
UTF8-tail = %x80-BF.

#### Parameters

• **data**: `Uint8Array`

The data to check.

#### Returns

`boolean`

True if the data is utf8.
