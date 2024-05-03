# Class: Is

Class to check types of objects.

## Constructors

### constructor

• **new Is**(): [`Is`](Is.md)

#### Returns

[`Is`](Is.md)

## Methods

### array

▸ **array**\<`T`\>(`value`): value is T[]

Is the value an array.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is T[]

True if the value is an array.

___

### arrayOneOf

▸ **arrayOneOf**\<`T`\>(`value`, `options`): value is T

Is the value an array with at least one element.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to test. |
| `options` | `T`[] | The options the value must be one of. |

#### Returns

value is T

True if the value is an element from the options array.

___

### arrayValue

▸ **arrayValue**\<`T`\>(`value`): value is T[]

Is the value an array with at least one element.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is T[]

True if the value is an array with at least one element.

___

### bigint

▸ **bigint**(`value`): value is bigint

Is the value a big integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is bigint

True if the value is a big integer.

___

### boolean

▸ **boolean**(`value`): value is boolean

Is the value a boolean.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is boolean

True if the value is a boolean.

___

### date

▸ **date**(`value`): value is Date

Is the value a date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is Date

True if the value is a date.

___

### dateEmpty

▸ **dateEmpty**(`value`): `boolean`

Is the value an empty date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

True if the value is an empty date.

___

### dateString

▸ **dateString**(`value`): `boolean`

Is the value a date string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

True if the value is a string in ISO 8601 date format.

___

### dateTimeString

▸ **dateTimeString**(`value`): `boolean`

Is the value a date string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

True if the value is a string in ISO 8601 date/time format.

___

### email

▸ **email**(`value`): value is string

Is the value a string formatted as an email address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a string.

___

### empty

▸ **empty**(`value`): value is undefined \| null

Is the property null or undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is undefined \| null

True if the value is a empty.

___

### function

▸ **function**(`value`): value is Function

Is the property a function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is Function

True if the value is a function.

___

### integer

▸ **integer**(`value`): value is number

Is the value an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is number

True if the value is an integer.

___

### json

▸ **json**(`value`): value is string

Is the value a JSON string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a JSON string.

___

### notEmpty

▸ **notEmpty**(`value`): `boolean`

Is the property is not null or undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

True if the value is a not empty.

___

### null

▸ **null**(`value`): value is null

Is the property null.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is null

True if the value is a empty.

___

### number

▸ **number**(`value`): value is number

Is the value a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is number

True if the value is a number.

___

### object

▸ **object**\<`T`\>(`value`): value is T

Is the value an object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | \{ `[id: string]`: `unknown`;  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is T

True if the value is a object.

___

### objectValue

▸ **objectValue**\<`T`\>(`value`): value is T

Is the value an object with at least one property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | \{ `[id: string]`: `unknown`;  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is T

True if the value is a object.

___

### string

▸ **string**(`value`): value is string

Is the value a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a string.

___

### stringBase64

▸ **stringBase64**(`value`): value is string

Is the value a base64 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a base64 string.

___

### stringBase64Url

▸ **stringBase64Url**(`value`): value is string

Is the value a base64 url string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a base64 string.

___

### stringHex

▸ **stringHex**(`value`): value is string

Is the value a hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a hex string.

___

### stringHexLength

▸ **stringHexLength**(`value`, `length`): value is string

Is the value a hex string of fixed length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |
| `length` | `number` | The length to test. |

#### Returns

value is string

True if the value is a hex string of required length.

___

### stringValue

▸ **stringValue**(`value`): value is string

Is the value a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is string

True if the value is a string.

___

### timeString

▸ **timeString**(`value`): `boolean`

Is the value a time string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

True if the value is a string in ISO 8601 time format.

___

### timestampMilliseconds

▸ **timestampMilliseconds**(`value`): value is number

Is the value a timestamp in milliseconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is number

True if the value is a date.

___

### timestampSeconds

▸ **timestampSeconds**(`value`): value is number

Is the value a timestamp in seconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is number

True if the value is a date.

___

### typedArray

▸ **typedArray**(`value`): value is Int8Array \| Uint8Array \| Int16Array \| Uint16Array \| Int32Array \| Uint32Array \| Float32Array \| Float64Array

Is the value a TypedArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is Int8Array \| Uint8Array \| Int16Array \| Uint16Array \| Int32Array \| Uint32Array \| Float32Array \| Float64Array

True if the value is a TypedArray.

___

### uint8Array

▸ **uint8Array**(`value`): value is Uint8Array

Is the value a Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is Uint8Array

True if the value is a Uint8Array.

___

### undefined

▸ **undefined**(`value`): value is undefined

Is the property undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is undefined

True if the value is a empty.
