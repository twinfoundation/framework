# Class: Is

Class to check types of objects.

## Constructors

### Constructor

> **new Is**(): `Is`

#### Returns

`Is`

## Methods

### undefined()

> `static` **undefined**(`value`): `value is undefined`

Is the property undefined.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is undefined`

True if the value is a empty.

***

### null()

> `static` **null**(`value`): `value is null`

Is the property null.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is null`

True if the value is a empty.

***

### empty()

> `static` **empty**(`value`): value is undefined \| null

Is the property null or undefined.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

value is undefined \| null

True if the value is a empty.

***

### notEmpty()

> `static` **notEmpty**(`value`): `boolean`

Is the property is not null or undefined.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`boolean`

True if the value is a not empty.

***

### string()

> `static` **string**(`value`): `value is string`

Is the value a string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a string.

***

### stringValue()

> `static` **stringValue**(`value`): `value is string`

Is the value a string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a string.

***

### json()

> `static` **json**(`value`): `value is string`

Is the value a JSON string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a JSON string.

***

### stringBase64()

> `static` **stringBase64**(`value`): `value is string`

Is the value a base64 string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a base64 string.

***

### stringBase64Url()

> `static` **stringBase64Url**(`value`): `value is string`

Is the value a base64 url string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a base64 string.

***

### stringBase58()

> `static` **stringBase58**(`value`): `value is string`

Is the value a base58 string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a base58 string.

***

### stringHex()

> `static` **stringHex**(`value`, `allowPrefix`): `value is string`

Is the value a hex string.

#### Parameters

##### value

`unknown`

The value to test.

##### allowPrefix

`boolean` = `false`

Allow the hex to have the 0x prefix.

#### Returns

`value is string`

True if the value is a hex string.

***

### stringHexLength()

> `static` **stringHexLength**(`value`, `length`, `allowPrefix`): `value is string`

Is the value a hex string of fixed length.

#### Parameters

##### value

`unknown`

The value to test.

##### length

`number`

The length to test.

##### allowPrefix

`boolean` = `false`

Allow the hex to have the 0x prefix.

#### Returns

`value is string`

True if the value is a hex string of required length.

***

### number()

> `static` **number**(`value`): `value is number`

Is the value a number.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

True if the value is a number.

***

### integer()

> `static` **integer**(`value`): `value is number`

Is the value an integer.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

True if the value is an integer.

***

### bigint()

> `static` **bigint**(`value`): `value is bigint`

Is the value a big integer.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is bigint`

True if the value is a big integer.

***

### boolean()

> `static` **boolean**(`value`): `value is boolean`

Is the value a boolean.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is boolean`

True if the value is a boolean.

***

### date()

> `static` **date**(`value`): `value is Date`

Is the value a date.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Date`

True if the value is a date.

***

### dateEmpty()

> `static` **dateEmpty**(`value`): `boolean`

Is the value an empty date.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`boolean`

True if the value is an empty date.

***

### dateString()

> `static` **dateString**(`value`): `boolean`

Is the value a date string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`boolean`

True if the value is a string in ISO 8601 date format.

***

### dateTimeString()

> `static` **dateTimeString**(`value`): `boolean`

Is the value a date string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`boolean`

True if the value is a string in ISO 8601 date/time format.

***

### timeString()

> `static` **timeString**(`value`): `boolean`

Is the value a time string.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`boolean`

True if the value is a string in ISO 8601 time format.

***

### timestampSeconds()

> `static` **timestampSeconds**(`value`): `value is number`

Is the value a timestamp in seconds.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

True if the value is a date.

***

### timestampMilliseconds()

> `static` **timestampMilliseconds**(`value`): `value is number`

Is the value a timestamp in milliseconds.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is number`

True if the value is a date.

***

### object()

> `static` **object**\<`T`\>(`value`): `value is T`

Is the value an object.

#### Type Parameters

##### T

`T` = \{[`id`: `string`]: `unknown`; \}

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is T`

True if the value is a object.

***

### objectValue()

> `static` **objectValue**\<`T`\>(`value`): `value is T`

Is the value an object with at least one property.

#### Type Parameters

##### T

`T` = \{[`id`: `string`]: `unknown`; \}

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is T`

True if the value is a object.

***

### array()

> `static` **array**\<`T`\>(`value`): `value is T[]`

Is the value an array.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is T[]`

True if the value is an array.

***

### arrayValue()

> `static` **arrayValue**\<`T`\>(`value`): `value is T[]`

Is the value an array with at least one element.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is T[]`

True if the value is an array with at least one element.

***

### arrayOneOf()

> `static` **arrayOneOf**\<`T`\>(`value`, `options`): `value is T`

Is the value an array with at least one element.

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

The value to test.

##### options

`T`[]

The options the value must be one of.

#### Returns

`value is T`

True if the value is an element from the options array.

***

### uint8Array()

> `static` **uint8Array**(`value`): `value is Uint8Array<ArrayBufferLike>`

Is the value a Uint8Array.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Uint8Array<ArrayBufferLike>`

True if the value is a Uint8Array.

***

### typedArray()

> `static` **typedArray**(`value`): value is Uint8Array\<ArrayBufferLike\> \| Int8Array\<ArrayBufferLike\> \| Uint16Array\<ArrayBufferLike\> \| Int16Array\<ArrayBufferLike\> \| Uint32Array\<ArrayBufferLike\> \| Int32Array\<ArrayBufferLike\> \| Float32Array\<ArrayBufferLike\> \| Float64Array\<ArrayBufferLike\>

Is the value a TypedArray.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

value is Uint8Array\<ArrayBufferLike\> \| Int8Array\<ArrayBufferLike\> \| Uint16Array\<ArrayBufferLike\> \| Int16Array\<ArrayBufferLike\> \| Uint32Array\<ArrayBufferLike\> \| Int32Array\<ArrayBufferLike\> \| Float32Array\<ArrayBufferLike\> \| Float64Array\<ArrayBufferLike\>

True if the value is a TypedArray.

***

### function()

> `static` **function**(`value`): `value is (args: unknown[]) => unknown`

Is the property a function.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is (args: unknown[]) => unknown`

True if the value is a function.

***

### email()

> `static` **email**(`value`): `value is string`

Is the value a string formatted as an email address.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is string`

True if the value is a string.

***

### promise()

> `static` **promise**\<`T`\>(`value`): `value is Promise<T>`

Is the value a promise.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is Promise<T>`

True if the value is a promise.

***

### regexp()

> `static` **regexp**(`value`): `value is RegExp`

Is the value a regexp.

#### Parameters

##### value

`unknown`

The value to test.

#### Returns

`value is RegExp`

True if the value is a regexp.
