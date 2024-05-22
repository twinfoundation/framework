# Class: Validation

Class to handle validation operations.

## Constructors

### new Validation()

> **new Validation**(): [`Validation`](Validation.md)

#### Returns

[`Validation`](Validation.md)

## Methods

### empty()

> `static` **empty**(`property`, `value`, `failures`): value is undefined \| null

Is the property null or undefined.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

value is undefined \| null

True if the value is a empty.

***

### notEmpty()

> `static` **notEmpty**(`property`, `value`, `failures`): `boolean`

Is the property is not null or undefined.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`boolean`

True if the value is a not empty.

***

### string()

> `static` **string**(`property`, `value`, `failures`): `value is string`

Is the property a string.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is a string.

***

### stringValue()

> `static` **stringValue**(`property`, `value`, `failures`): `value is string`

Is the property a string with a value.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is a string.

***

### number()

> `static` **number**(`property`, `value`, `failures`): `value is number`

Is the property a number.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is number`

True if the value is a number.

***

### integer()

> `static` **integer**(`property`, `value`, `failures`): `value is number`

Is the property an integer.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is number`

True if the value is a number.

***

### bigint()

> `static` **bigint**(`property`, `value`, `failures`): `value is bigint`

Is the property a bigint.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is bigint`

True if the value is a bigint.

***

### boolean()

> `static` **boolean**(`property`, `value`, `failures`): `value is boolean`

Is the property a boolean.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is boolean`

True if the value is a boolean.

***

### date()

> `static` **date**(`property`, `value`, `failures`): `value is Date`

Is the property a date.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is Date`

True if the value is a date.

***

### dateString()

> `static` **dateString**(`property`, `value`, `failures`): `value is string`

Is the property a date in ISO 8601 format.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is a date.

***

### dateTimeString()

> `static` **dateTimeString**(`property`, `value`, `failures`): `value is string`

Is the property a date/time in ISO 8601 format.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is a date/time.

***

### timeString()

> `static` **timeString**(`property`, `value`, `failures`): `value is string`

Is the property a time in ISO 8601 format.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is a time.

***

### timestampMilliseconds()

> `static` **timestampMilliseconds**(`property`, `value`, `failures`): `value is number`

Is the property a timestamp in milliseconds.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is number`

True if the value is a timestamp in milliseconds.

***

### timestampSeconds()

> `static` **timestampSeconds**(`property`, `value`, `failures`): `value is number`

Is the property a timestamp in seconds.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is number`

True if the value is a timestamp in seconds.

***

### object()

> `static` **object**\<`T`\>(`property`, `value`, `failures`): `value is T`

Is the property an object.

#### Type parameters

• **T** = `object`

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is T`

True if the value is a object.

***

### array()

> `static` **array**\<`T`\>(`property`, `value`, `failures`): `value is T[]`

Is the property an array.

#### Type parameters

• **T**

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is T[]`

True if the value is an array.

***

### arrayValue()

> `static` **arrayValue**\<`T`\>(`property`, `value`, `failures`): `value is T[]`

Is the property an array with at least one item.

#### Type parameters

• **T**

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is T[]`

True if the value is an array with at least one element.

***

### arrayOneOf()

> `static` **arrayOneOf**\<`T`\>(`property`, `value`, `options`, `failures`): `value is T`

Is the property one of a list of items.

#### Type parameters

• **T**

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `T`

The value to test.

• **options**: `T`[]

The options the value must be one of.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is T`

True if the value is one of the items in the options.

***

### uint8Array()

> `static` **uint8Array**(`property`, `value`, `failures`): `value is Uint8Array`

Is the property a Uint8Array.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is Uint8Array`

True if the value is a Uint8Array.

***

### json()

> `static` **json**(`property`, `value`, `failures`): `value is string`

Is the property valid JSON.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is valid JSON.

***

### email()

> `static` **email**(`property`, `value`, `failures`): `value is string`

Is the property a string in e-mail format.

#### Parameters

• **property**: `string`

The name of the property.

• **value**: `unknown`

The value to test.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

True if the value is a valid looking e-mail.

***

### asValidationError()

> `static` **asValidationError**(`source`, `objectName`, `failures`): `void`

Throw the validation failures as a ValidationError.

#### Parameters

• **source**: `string`

The source of the error.

• **objectName**: `string`

The object that was being validated.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The validation failures.

#### Returns

`void`

#### Throws

ValidationError From the converted failures.

***

### appendChildFailures()

> `static` **appendChildFailures**(`failures`, `childFailures`, `childName`?): `void`

Append failures to the parent for a child object.

#### Parameters

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The validation failures.

• **childFailures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The validation failures for the child.

• **childName?**: `string`

The name of the child object.

#### Returns

`void`

***

### toPropertyMap()

> `static` **toPropertyMap**(`failures`): `object`

Map a list of failures to their properties.

#### Parameters

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The validation failures.

#### Returns

`object`

The failures mapped to their properties.
