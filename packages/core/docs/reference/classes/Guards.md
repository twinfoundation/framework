# Class: Guards

Class to handle guard operations for parameters.

## Constructors

### new Guards()

> **new Guards**(): [`Guards`](Guards.md)

#### Returns

[`Guards`](Guards.md)

## Methods

### array()

> `static` **array**\<`T`\>(`source`, `property`, `value`): `asserts value is T[]`

Is the property is an array.

#### Type parameters

• **T**

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is T[]`

#### Throws

GuardError If the value does not match the assertion.

***

### arrayOneOf()

> `static` **arrayOneOf**\<`T`\>(`source`, `property`, `value`, `options`): `asserts value is T`

Is the property one of a list of items.

#### Type parameters

• **T**

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `T`

The value to test.

• **options**: `T`[]

The options the value must be one of.

#### Returns

`asserts value is T`

#### Throws

GuardError If the value does not match the assertion.

***

### arrayValue()

> `static` **arrayValue**\<`T`\>(`source`, `property`, `value`): `asserts value is T[]`

Is the property is an array with at least one item.

#### Type parameters

• **T**

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is T[]`

#### Throws

GuardError If the value does not match the assertion.

***

### bigint()

> `static` **bigint**(`source`, `property`, `value`): `asserts value is bigint`

Is the property a bigint.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is bigint`

#### Throws

GuardError If the value does not match the assertion.

***

### boolean()

> `static` **boolean**(`source`, `property`, `value`): `asserts value is boolean`

Is the property a boolean.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is boolean`

#### Throws

GuardError If the value does not match the assertion.

***

### date()

> `static` **date**(`source`, `property`, `value`): `asserts value is Date`

Is the property a date.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is Date`

#### Throws

GuardError If the value does not match the assertion.

***

### email()

> `static` **email**(`source`, `property`, `value`): `asserts value is string`

Is the property a string formatted as an email address.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### function()

> `static` **function**(`source`, `property`, `value`): `boolean`

Is the property a function.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`boolean`

True if the value is a function.

#### Throws

GuardError If the value does not match the assertion.

***

### integer()

> `static` **integer**(`source`, `property`, `value`): `asserts value is number`

Is the property an integer.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is number`

#### Throws

GuardError If the value does not match the assertion.

***

### number()

> `static` **number**(`source`, `property`, `value`): `asserts value is number`

Is the property a number.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is number`

#### Throws

GuardError If the value does not match the assertion.

***

### object()

> `static` **object**\<`T`\>(`source`, `property`, `value`): `asserts value is T`

Is the property an object.

#### Type parameters

• **T** = `object`

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is T`

#### Throws

GuardError If the value does not match the assertion.

***

### objectValue()

> `static` **objectValue**\<`T`\>(`source`, `property`, `value`): `asserts value is T`

Is the property is an object with at least one property.

#### Type parameters

• **T** = `object`

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is T`

#### Throws

GuardError If the value does not match the assertion.

***

### string()

> `static` **string**(`source`, `property`, `value`): `asserts value is string`

Is the property a string.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### stringBase64()

> `static` **stringBase64**(`source`, `property`, `value`): `asserts value is string`

Is the property a base64 string.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### stringBase64Url()

> `static` **stringBase64Url**(`source`, `property`, `value`): `asserts value is string`

Is the property a base64 url string.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### stringHex()

> `static` **stringHex**(`source`, `property`, `value`): `asserts value is string`

Is the property a string with a hex value.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### stringHexLength()

> `static` **stringHexLength**(`source`, `property`, `value`, `length`): `asserts value is string`

Is the property a string with a hex value with fixed length.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **length**: `number`

The length of the string to match.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### stringValue()

> `static` **stringValue**(`source`, `property`, `value`): `asserts value is string`

Is the property a string with a value.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### timestampMilliseconds()

> `static` **timestampMilliseconds**(`source`, `property`, `value`): `asserts value is number`

Is the property a timestamp in milliseconds.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is number`

#### Throws

GuardError If the value does not match the assertion.

***

### timestampSeconds()

> `static` **timestampSeconds**(`source`, `property`, `value`): `asserts value is number`

Is the property a timestamp in seconds.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is number`

#### Throws

GuardError If the value does not match the assertion.

***

### uint8Array()

> `static` **uint8Array**(`source`, `property`, `value`): `asserts value is Uint8Array`

Is the property a Uint8Array.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

#### Returns

`asserts value is Uint8Array`

#### Throws

GuardError If the value does not match the assertion.
