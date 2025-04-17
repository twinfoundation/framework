# Class: Validation

Class to handle validation operations.

## Constructors

### Constructor

> **new Validation**(): `Validation`

#### Returns

`Validation`

## Methods

### empty()

> `static` **empty**(`property`, `value`, `failures`, `fieldNameResource?`): value is undefined \| null

Is the property null or undefined.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

value is undefined \| null

True if the value is a empty.

***

### notEmpty()

> `static` **notEmpty**(`property`, `value`, `failures`, `fieldNameResource?`): `boolean`

Is the property is not null or undefined.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`boolean`

True if the value is a not empty.

***

### string()

> `static` **string**(`property`, `value`, `failures`, `fieldNameResource?`, `options?`): `value is string`

Is the property a string.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

##### options?

Additional options for the validation.

###### format?

`RegExp` \| `"base64"` \| `"base58"` \| `"hex"`

Specific format to check.

###### minLength?

`number`

The minimum length of the string.

###### maxLength?

`number`

The maximum length of the string.

#### Returns

`value is string`

True if the value is a valid string.

***

### stringValue()

> `static` **stringValue**(`property`, `value`, `failures`, `fieldNameResource?`, `options?`): `value is string`

Is the property a string with a value.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

##### options?

Additional options for the validation.

###### minLength?

`number`

The minimum length of the string.

###### maxLength?

`number`

The maximum length of the string.

#### Returns

`value is string`

True if the value is a valid string.

***

### number()

> `static` **number**(`property`, `value`, `failures`, `fieldNameResource?`, `options?`): `value is number`

Is the property a number.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

##### options?

Additional options for the validation.

###### minValue?

`number`

The minimum value of the number.

###### maxValue?

`number`

The maximum value of the number.

#### Returns

`value is number`

True if the value is a valid number.

***

### integer()

> `static` **integer**(`property`, `value`, `failures`, `fieldNameResource?`, `options?`): `value is number`

Is the property an integer.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

##### options?

Additional options for the validation.

###### minValue?

`number`

The minimum value of the integer.

###### maxValue?

`number`

The maximum value of the integer.

#### Returns

`value is number`

True if the value is a valid integer.

***

### bigint()

> `static` **bigint**(`property`, `value`, `failures`, `fieldNameResource?`, `options?`): `value is bigint`

Is the property a bigint.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

##### options?

Additional options for the validation.

###### minValue?

`bigint`

The minimum value of the bigint.

###### maxValue?

`bigint`

The maximum value of the bigint.

#### Returns

`value is bigint`

True if the value is a valid bigint.

***

### boolean()

> `static` **boolean**(`property`, `value`, `failures`, `fieldNameResource?`): `value is boolean`

Is the property a boolean.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is boolean`

True if the value is a boolean.

***

### date()

> `static` **date**(`property`, `value`, `failures`, `fieldNameResource?`): `value is Date`

Is the property a date.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is Date`

True if the value is a date.

***

### dateString()

> `static` **dateString**(`property`, `value`, `failures`, `fieldNameResource?`): `value is string`

Is the property a date in ISO 8601 format.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is string`

True if the value is a date.

***

### dateTimeString()

> `static` **dateTimeString**(`property`, `value`, `failures`, `fieldNameResource?`): `value is string`

Is the property a date/time in ISO 8601 format.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is string`

True if the value is a date/time.

***

### timeString()

> `static` **timeString**(`property`, `value`, `failures`, `fieldNameResource?`): `value is string`

Is the property a time in ISO 8601 format.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is string`

True if the value is a time.

***

### timestampMilliseconds()

> `static` **timestampMilliseconds**(`property`, `value`, `failures`, `fieldNameResource?`): `value is number`

Is the property a timestamp in milliseconds.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is number`

True if the value is a timestamp in milliseconds.

***

### timestampSeconds()

> `static` **timestampSeconds**(`property`, `value`, `failures`, `fieldNameResource?`): `value is number`

Is the property a timestamp in seconds.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is number`

True if the value is a timestamp in seconds.

***

### object()

> `static` **object**\<`T`\>(`property`, `value`, `failures`, `fieldNameResource?`): `value is T`

Is the property an object.

#### Type Parameters

##### T

`T` = \{[`id`: `string`]: `unknown`; \}

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is T`

True if the value is a object.

***

### array()

> `static` **array**\<`T`\>(`property`, `value`, `failures`, `fieldNameResource?`): `value is T[]`

Is the property an array.

#### Type Parameters

##### T

`T`

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is T[]`

True if the value is an array.

***

### arrayValue()

> `static` **arrayValue**\<`T`\>(`property`, `value`, `failures`, `fieldNameResource?`): `value is T[]`

Is the property an array with at least one item.

#### Type Parameters

##### T

`T`

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is T[]`

True if the value is an array with at least one element.

***

### arrayOneOf()

> `static` **arrayOneOf**\<`T`\>(`property`, `value`, `options`, `failures`, `fieldNameResource?`): `value is T`

Is the property one of a list of items.

#### Type Parameters

##### T

`T`

#### Parameters

##### property

`string`

The name of the property.

##### value

`T`

The value to test.

##### options

`T`[]

The options the value must be one of.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is T`

True if the value is one of the items in the options.

***

### uint8Array()

> `static` **uint8Array**(`property`, `value`, `failures`, `fieldNameResource?`): `value is Uint8Array<ArrayBufferLike>`

Is the property a Uint8Array.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is Uint8Array<ArrayBufferLike>`

True if the value is a Uint8Array.

***

### json()

> `static` **json**(`property`, `value`, `failures`, `fieldNameResource?`): `value is string`

Is the property valid JSON.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is string`

True if the value is valid JSON.

***

### email()

> `static` **email**(`property`, `value`, `failures`, `fieldNameResource?`): `value is string`

Is the property a string in e-mail format.

#### Parameters

##### property

`string`

The name of the property.

##### value

`unknown`

The value to test.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

##### fieldNameResource?

`string`

Optional i18n resource of the field name to display in the message.

#### Returns

`value is string`

True if the value is a valid looking e-mail.

***

### asValidationError()

> `static` **asValidationError**(`source`, `objectName`, `failures`): `void`

Throw the validation failures as a ValidationError.

#### Parameters

##### source

`string`

The source of the error.

##### objectName

`string`

The object that was being validated.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The validation failures.

#### Returns

`void`

#### Throws

ValidationError From the converted failures.

***

### toPropertyMap()

> `static` **toPropertyMap**(`failures`, `propertyMap`, `clearMap`): `void`

Map a list of failures to their properties in a map.

#### Parameters

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The validation failures to combine into the map for the properties.

##### propertyMap

The map to add the failures to.

##### clearMap

`boolean` = `true`

Should the map be cleared before adding the failures.

#### Returns

`void`
