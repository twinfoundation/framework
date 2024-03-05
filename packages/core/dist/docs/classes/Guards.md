# Class: Guards

Class to handle guard operations for parameters.

## Constructors

### constructor

• **new Guards**(): [`Guards`](Guards.md)

#### Returns

[`Guards`](Guards.md)

## Methods

### array

▸ **array**\<`T`\>(`source`, `property`, `value`): asserts value is T[]

Is the property is an array.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is T[]

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:224](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L224)

___

### arrayOneOf

▸ **arrayOneOf**\<`T`\>(`source`, `property`, `value`, `options`): asserts value is T

Is the property one of a list of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `T` | The value to test. |
| `options` | `T`[] | The options the value must be one of. |

#### Returns

asserts value is T

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:258](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L258)

___

### arrayValue

▸ **arrayValue**\<`T`\>(`source`, `property`, `value`): asserts value is T[]

Is the property is an array with at least one item.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is T[]

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:237](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L237)

___

### boolean

▸ **boolean**(`source`, `property`, `value`): asserts value is boolean

Is the property a boolean.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is boolean

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:121](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L121)

___

### date

▸ **date**(`source`, `property`, `value`): asserts value is Date

Is the property a date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is Date

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:138](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L138)

___

### email

▸ **email**(`source`, `property`, `value`): asserts value is string

Is the property a string formatted as an email address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:311](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L311)

___

### function

▸ **function**(`source`, `property`, `value`): `boolean`

Is the property a function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

`boolean`

True if the value is a function.

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:297](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L297)

___

### integer

▸ **integer**(`source`, `property`, `value`): asserts value is number

Is the property an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is number

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:108](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L108)

___

### milliseconds

▸ **milliseconds**(`source`, `property`, `value`): asserts value is number

Is the property a timestamp in milliseconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is number

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:151](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L151)

___

### number

▸ **number**(`source`, `property`, `value`): asserts value is number

Is the property a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is number

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:95](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L95)

___

### object

▸ **object**\<`T`\>(`source`, `property`, `value`): asserts value is T

Is the property an object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | \{ `[id: string]`: `unknown`;  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is T

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:181](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L181)

___

### objectValue

▸ **objectValue**\<`T`\>(`source`, `property`, `value`): asserts value is T

Is the property is an object with at least one property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | \{ `[id: string]`: `unknown`;  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is T

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:201](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L201)

___

### seconds

▸ **seconds**(`source`, `property`, `value`): asserts value is number

Is the property a timestamp in seconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is number

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:168](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L168)

___

### string

▸ **string**(`source`, `property`, `value`): asserts value is string

Is the property a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:18](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L18)

___

### stringHex

▸ **stringHex**(`source`, `property`, `value`): asserts value is string

Is the property a string with a hex value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:51](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L51)

___

### stringHexLength

▸ **stringHexLength**(`source`, `property`, `value`, `length`): asserts value is string

Is the property a string with a hex value with fixed length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |
| `length` | `number` | The length of the string to match. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:70](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L70)

___

### stringValue

▸ **stringValue**(`source`, `property`, `value`): asserts value is string

Is the property a string with a value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:31](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L31)

___

### uint8Array

▸ **uint8Array**(`source`, `property`, `value`): asserts value is Uint8Array

Is the property a Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The value to test. |

#### Returns

asserts value is Uint8Array

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/utils/guards.ts:279](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/guards.ts#L279)
