# Class: StringHelper

Class to help with string.

## Constructors

### constructor

• **new StringHelper**(): [`StringHelper`](StringHelper.md)

#### Returns

[`StringHelper`](StringHelper.md)

## Methods

### camelCase

▸ **camelCase**(`input`, `stripInterfacePrefix?`): `string`

Camel case all the words.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input to convert. |
| `stripInterfacePrefix` | `boolean` | `true` | Strip interface prefixes. |

#### Returns

`string`

The camel case version of the input.

___

### kebabCase

▸ **kebabCase**(`input`, `stripInterfacePrefix?`): `string`

Convert the input string to kebab case.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input to convert. |
| `stripInterfacePrefix` | `boolean` | `true` | Strip interface prefixes. |

#### Returns

`string`

The kebab case version of the input.

___

### pascalCase

▸ **pascalCase**(`input`, `stripInterfacePrefix?`): `string`

Pascal case all the words.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input to convert. |
| `stripInterfacePrefix` | `boolean` | `true` | Strip interface prefixes. |

#### Returns

`string`

The pascal case version of the input.

___

### stripPrefix

▸ **stripPrefix**(`input`): `string`

Strip interface prefix if there is one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The input to strip. |

#### Returns

`string`

The input with any interface prefix stripped.

___

### titleCase

▸ **titleCase**(`input`, `stripInterfacePrefix?`): `string`

Title case all the words.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input to convert. |
| `stripInterfacePrefix` | `boolean` | `true` | Strip interface prefixes. |

#### Returns

`string`

The title case version of the input.

___

### trimLeadingSlashes

▸ **trimLeadingSlashes**(`value`): `string`

Trim leading slashes from a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` | The value to trim. |

#### Returns

`string`

The trimmed value.

___

### trimTrailingSlashes

▸ **trimTrailingSlashes**(`value`): `string`

Trim trailing slashes from a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `string` | The value to trim. |

#### Returns

`string`

The trimmed value.

___

### wordPath

▸ **wordPath**(`input`, `stripInterfacePrefix?`): `string`

Convert the words to a path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input to convert. |
| `stripInterfacePrefix` | `boolean` | `true` | Strip interface prefixes. |

#### Returns

`string`

The path version of the input.

___

### words

▸ **words**(`input`): `string`[]

Split a string into words.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The input to split. |

#### Returns

`string`[]

The string split into words.
