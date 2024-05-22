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

• **stripInterfacePrefix**: `boolean`= `true`

Strip interface prefixes.

#### Returns

`string`

The kebab case version of the input.

***

### titleCase()

> `static` **titleCase**(`input`, `stripInterfacePrefix`): `string`

Title case all the words.

#### Parameters

• **input**: `string`

The input to convert.

• **stripInterfacePrefix**: `boolean`= `true`

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

• **stripInterfacePrefix**: `boolean`= `true`

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

• **stripInterfacePrefix**: `boolean`= `true`

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

• **stripInterfacePrefix**: `boolean`= `true`

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
