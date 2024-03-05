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

#### Defined in

[packages/core/src/utils/stringHelper.ts:94](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L94)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:39](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L39)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:75](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L75)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:134](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L134)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:56](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L56)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:26](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L26)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:14](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L14)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:117](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L117)

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

#### Defined in

[packages/core/src/utils/stringHelper.ts:150](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/stringHelper.ts#L150)
