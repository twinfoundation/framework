# Class: Validation

Class to handle validation operations.

## Constructors

### constructor

• **new Validation**(): [`Validation`](Validation.md)

#### Returns

[`Validation`](Validation.md)

## Methods

### appendChildFailures

▸ **appendChildFailures**(`failures`, `childFailures`, `childName?`): `void`

Append failures to the parent for a child object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The validation failures. |
| `childFailures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The validation failures for the child. |
| `childName?` | `string` | The name of the child object. |

#### Returns

`void`

___

### array

▸ **array**\<`T`\>(`property`, `value`, `failures`): value is T[]

Is the property an array.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is T[]

True if the value is an array.

___

### arrayOneOf

▸ **arrayOneOf**\<`T`\>(`property`, `value`, `options`, `failures`): value is T

Is the property one of a list of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `T` | The value to test. |
| `options` | `T`[] | The options the value must be one of. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is T

True if the value is one of the items in the options.

___

### arrayValue

▸ **arrayValue**\<`T`\>(`property`, `value`, `failures`): value is T[]

Is the property an array with at least one item.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is T[]

True if the value is an array with at least one element.

___

### asValidationError

▸ **asValidationError**(`source`, `objectName`, `failures`): `void`

Throw the validation failures as a ValidationError.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `objectName` | `string` | The object that was being validated. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The validation failures. |

#### Returns

`void`

**`Throws`**

ValidationError From the converted failures.

___

### bigint

▸ **bigint**(`property`, `value`, `failures`): value is bigint

Is the property a bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is bigint

True if the value is a bigint.

___

### boolean

▸ **boolean**(`property`, `value`, `failures`): value is boolean

Is the property a boolean.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is boolean

True if the value is a boolean.

___

### date

▸ **date**(`property`, `value`, `failures`): value is Date

Is the property a date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is Date

True if the value is a date.

___

### dateString

▸ **dateString**(`property`, `value`, `failures`): value is string

Is the property a date in ISO 8601 format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is a date.

___

### dateTimeString

▸ **dateTimeString**(`property`, `value`, `failures`): value is string

Is the property a date/time in ISO 8601 format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is a date/time.

___

### email

▸ **email**(`property`, `value`, `failures`): value is string

Is the property a string in e-mail format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is a valid looking e-mail.

___

### empty

▸ **empty**(`property`, `value`, `failures`): value is undefined \| null

Is the property null or undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is undefined \| null

True if the value is a empty.

___

### integer

▸ **integer**(`property`, `value`, `failures`): value is number

Is the property an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is number

True if the value is a number.

___

### json

▸ **json**(`property`, `value`, `failures`): value is string

Is the property valid JSON.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is valid JSON.

___

### notEmpty

▸ **notEmpty**(`property`, `value`, `failures`): `boolean`

Is the property is not null or undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

`boolean`

True if the value is a not empty.

___

### number

▸ **number**(`property`, `value`, `failures`): value is number

Is the property a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is number

True if the value is a number.

___

### object

▸ **object**\<`T`\>(`property`, `value`, `failures`): value is T

Is the property an object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | \{ `[id: string]`: `unknown`;  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is T

True if the value is a object.

___

### string

▸ **string**(`property`, `value`, `failures`): value is string

Is the property a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is a string.

___

### stringValue

▸ **stringValue**(`property`, `value`, `failures`): value is string

Is the property a string with a value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is a string.

___

### timeString

▸ **timeString**(`property`, `value`, `failures`): value is string

Is the property a time in ISO 8601 format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

True if the value is a time.

___

### timestampMilliseconds

▸ **timestampMilliseconds**(`property`, `value`, `failures`): value is number

Is the property a timestamp in milliseconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is number

True if the value is a timestamp in milliseconds.

___

### timestampSeconds

▸ **timestampSeconds**(`property`, `value`, `failures`): value is number

Is the property a timestamp in seconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is number

True if the value is a timestamp in seconds.

___

### toPropertyMap

▸ **toPropertyMap**(`failures`): `Object`

Map a list of failures to their properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The validation failures. |

#### Returns

`Object`

The failures mapped to their properties.

___

### uint8Array

▸ **uint8Array**(`property`, `value`, `failures`): value is Uint8Array

Is the property a Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is Uint8Array

True if the value is a Uint8Array.
