# Class: Validation

Class to handle validation operations.

## Constructors

### constructor

• **new Validation**(): [`Validation`](Validation.md)

#### Returns

[`Validation`](Validation.md)

## Methods

### appendChildFailures

▸ **appendChildFailures**(`failures`, `childfailures`, `childName?`): `void`

Append failures to the parent for a child object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The validation failures. |
| `childfailures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The validation failures for the child. |
| `childName?` | `string` | The name of the child object. |

#### Returns

`void`

#### Defined in

[packages/core/src/utils/validation.ts:617](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L617)

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

#### Defined in

[packages/core/src/utils/validation.ts:434](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L434)

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

#### Defined in

[packages/core/src/utils/validation.ts:485](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L485)

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

#### Defined in

[packages/core/src/utils/validation.ts:459](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L459)

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

#### Defined in

[packages/core/src/utils/validation.ts:601](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L601)

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

#### Defined in

[packages/core/src/utils/validation.ts:168](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L168)

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

#### Defined in

[packages/core/src/utils/validation.ts:193](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L193)

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

#### Defined in

[packages/core/src/utils/validation.ts:229](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L229)

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

#### Defined in

[packages/core/src/utils/validation.ts:265](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L265)

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

#### Defined in

[packages/core/src/utils/validation.ts:576](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L576)

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

#### Defined in

[packages/core/src/utils/validation.ts:18](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L18)

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

#### Defined in

[packages/core/src/utils/validation.ts:143](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L143)

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

#### Defined in

[packages/core/src/utils/validation.ts:547](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L547)

___

### milliseconds

▸ **milliseconds**(`property`, `value`, `failures`): value is number

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

#### Defined in

[packages/core/src/utils/validation.ts:337](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L337)

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

#### Defined in

[packages/core/src/utils/validation.ts:43](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L43)

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

#### Defined in

[packages/core/src/utils/validation.ts:118](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L118)

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

#### Defined in

[packages/core/src/utils/validation.ts:409](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L409)

___

### seconds

▸ **seconds**(`property`, `value`, `failures`): value is number

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

#### Defined in

[packages/core/src/utils/validation.ts:373](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L373)

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

#### Defined in

[packages/core/src/utils/validation.ts:68](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L68)

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

#### Defined in

[packages/core/src/utils/validation.ts:93](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L93)

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

#### Defined in

[packages/core/src/utils/validation.ts:301](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L301)

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

#### Defined in

[packages/core/src/utils/validation.ts:642](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L642)

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

#### Defined in

[packages/core/src/utils/validation.ts:522](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/validation.ts#L522)
