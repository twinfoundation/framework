# Class: Is

Class to check types of objects.

## Constructors

### new Is()

> **new Is**(): [`Is`](Is.md)

#### Returns

[`Is`](Is.md)

## Methods

### undefined()

> `static` **undefined**(`value`): `value is undefined`

Is the property undefined.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is undefined`

True if the value is a empty.

***

### null()

> `static` **null**(`value`): `value is null`

Is the property null.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is null`

True if the value is a empty.

***

### empty()

> `static` **empty**(`value`): value is undefined \| null

Is the property null or undefined.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

value is undefined \| null

True if the value is a empty.

***

### notEmpty()

> `static` **notEmpty**(`value`): `boolean`

Is the property is not null or undefined.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`boolean`

True if the value is a not empty.

***

### string()

> `static` **string**(`value`): `value is string`

Is the value a string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a string.

***

### stringValue()

> `static` **stringValue**(`value`): `value is string`

Is the value a string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a string.

***

### json()

> `static` **json**(`value`): `value is string`

Is the value a JSON string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a JSON string.

***

### stringBase64()

> `static` **stringBase64**(`value`): `value is string`

Is the value a base64 string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a base64 string.

***

### stringBase64Url()

> `static` **stringBase64Url**(`value`): `value is string`

Is the value a base64 url string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a base64 string.

***

### stringHex()

> `static` **stringHex**(`value`): `value is string`

Is the value a hex string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a hex string.

***

### stringHexLength()

> `static` **stringHexLength**(`value`, `length`): `value is string`

Is the value a hex string of fixed length.

#### Parameters

• **value**: `unknown`

The value to test.

• **length**: `number`

The length to test.

#### Returns

`value is string`

True if the value is a hex string of required length.

***

### number()

> `static` **number**(`value`): `value is number`

Is the value a number.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is number`

True if the value is a number.

***

### integer()

> `static` **integer**(`value`): `value is number`

Is the value an integer.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is number`

True if the value is an integer.

***

### bigint()

> `static` **bigint**(`value`): `value is bigint`

Is the value a big integer.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is bigint`

True if the value is a big integer.

***

### boolean()

> `static` **boolean**(`value`): `value is boolean`

Is the value a boolean.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is boolean`

True if the value is a boolean.

***

### date()

> `static` **date**(`value`): `value is Date`

Is the value a date.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is Date`

True if the value is a date.

***

### dateEmpty()

> `static` **dateEmpty**(`value`): `boolean`

Is the value an empty date.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`boolean`

True if the value is an empty date.

***

### dateString()

> `static` **dateString**(`value`): `boolean`

Is the value a date string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`boolean`

True if the value is a string in ISO 8601 date format.

***

### dateTimeString()

> `static` **dateTimeString**(`value`): `boolean`

Is the value a date string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`boolean`

True if the value is a string in ISO 8601 date/time format.

***

### timeString()

> `static` **timeString**(`value`): `boolean`

Is the value a time string.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`boolean`

True if the value is a string in ISO 8601 time format.

***

### timestampSeconds()

> `static` **timestampSeconds**(`value`): `value is number`

Is the value a timestamp in seconds.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is number`

True if the value is a date.

***

### timestampMilliseconds()

> `static` **timestampMilliseconds**(`value`): `value is number`

Is the value a timestamp in milliseconds.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is number`

True if the value is a date.

***

### object()

> `static` **object**\<`T`\>(`value`): `value is T`

Is the value an object.

#### Type parameters

• **T** = `object`

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is T`

True if the value is a object.

***

### objectValue()

> `static` **objectValue**\<`T`\>(`value`): `value is T`

Is the value an object with at least one property.

#### Type parameters

• **T** = `object`

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is T`

True if the value is a object.

***

### array()

> `static` **array**\<`T`\>(`value`): `value is T[]`

Is the value an array.

#### Type parameters

• **T**

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is T[]`

True if the value is an array.

***

### arrayValue()

> `static` **arrayValue**\<`T`\>(`value`): `value is T[]`

Is the value an array with at least one element.

#### Type parameters

• **T**

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is T[]`

True if the value is an array with at least one element.

***

### arrayOneOf()

> `static` **arrayOneOf**\<`T`\>(`value`, `options`): `value is T`

Is the value an array with at least one element.

#### Type parameters

• **T**

#### Parameters

• **value**: `T`

The value to test.

• **options**: `T`[]

The options the value must be one of.

#### Returns

`value is T`

True if the value is an element from the options array.

***

### uint8Array()

> `static` **uint8Array**(`value`): `value is Uint8Array`

Is the value a Uint8Array.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is Uint8Array`

True if the value is a Uint8Array.

***

### typedArray()

> `static` **typedArray**(`value`): value is Int8Array \| Uint8Array \| Int16Array \| Uint16Array \| Int32Array \| Uint32Array \| Float32Array \| Float64Array

Is the value a TypedArray.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

value is Int8Array \| Uint8Array \| Int16Array \| Uint16Array \| Int32Array \| Uint32Array \| Float32Array \| Float64Array

True if the value is a TypedArray.

***

### function()

> `static` **function**(`value`): `value is Function`

Is the property a function.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is Function`

True if the value is a function.

***

### email()

> `static` **email**(`value`): `value is string`

Is the value a string formatted as an email address.

#### Parameters

• **value**: `unknown`

The value to test.

#### Returns

`value is string`

True if the value is a string.
