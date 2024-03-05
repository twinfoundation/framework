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

#### Defined in

[packages/core/src/utils/is.ts:224](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L224)

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

#### Defined in

[packages/core/src/utils/is.ts:243](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L243)

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

#### Defined in

[packages/core/src/utils/is.ts:233](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L233)

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

#### Defined in

[packages/core/src/utils/is.ts:106](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L106)

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

#### Defined in

[packages/core/src/utils/is.ts:115](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L115)

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

#### Defined in

[packages/core/src/utils/is.ts:127](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L127)

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

#### Defined in

[packages/core/src/utils/is.ts:139](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L139)

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

#### Defined in

[packages/core/src/utils/is.ts:151](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L151)

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

#### Defined in

[packages/core/src/utils/is.ts:279](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L279)

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

#### Defined in

[packages/core/src/utils/is.ts:33](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L33)

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

#### Defined in

[packages/core/src/utils/is.ts:270](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L270)

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

True if the value is a number.

#### Defined in

[packages/core/src/utils/is.ts:97](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L97)

___

### milliseconds

▸ **milliseconds**(`value`): value is number

Is the value a timestamp in milliseconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is number

True if the value is a date.

#### Defined in

[packages/core/src/utils/is.ts:188](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L188)

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

#### Defined in

[packages/core/src/utils/is.ts:42](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L42)

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

#### Defined in

[packages/core/src/utils/is.ts:24](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L24)

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

#### Defined in

[packages/core/src/utils/is.ts:88](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L88)

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

#### Defined in

[packages/core/src/utils/is.ts:201](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L201)

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

#### Defined in

[packages/core/src/utils/is.ts:210](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L210)

___

### seconds

▸ **seconds**(`value`): value is number

Is the value a timestamp in seconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to test. |

#### Returns

value is number

True if the value is a date.

#### Defined in

[packages/core/src/utils/is.ts:175](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L175)

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

#### Defined in

[packages/core/src/utils/is.ts:51](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L51)

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

#### Defined in

[packages/core/src/utils/is.ts:69](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L69)

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

#### Defined in

[packages/core/src/utils/is.ts:79](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L79)

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

#### Defined in

[packages/core/src/utils/is.ts:60](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L60)

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

#### Defined in

[packages/core/src/utils/is.ts:163](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L163)

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

#### Defined in

[packages/core/src/utils/is.ts:261](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L261)

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

#### Defined in

[packages/core/src/utils/is.ts:15](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/is.ts#L15)
