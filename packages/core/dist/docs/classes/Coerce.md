# Class: Coerce

Coerce an object from one type to another.

## Constructors

### constructor

• **new Coerce**(): [`Coerce`](Coerce.md)

#### Returns

[`Coerce`](Coerce.md)

## Methods

### boolean

▸ **boolean**(`value`): `undefined` \| `boolean`

Coerce the value to a boolean.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to coerce. |

#### Returns

`undefined` \| `boolean`

The value if it can be coerced.

**`Throws`**

TypeError If the value can not be coerced.

#### Defined in

[packages/core/src/utils/coerce.ts:68](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/coerce.ts#L68)

___

### date

▸ **date**(`value`): `undefined` \| `Date`

Coerce the value to a date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to coerce. |

#### Returns

`undefined` \| `Date`

The value if it can be coerced.

**`Throws`**

TypeError If the value can not be coerced.

#### Defined in

[packages/core/src/utils/coerce.ts:95](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/coerce.ts#L95)

___

### dateTime

▸ **dateTime**(`value`): `undefined` \| `Date`

Coerce the value to a date/time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to coerce. |

#### Returns

`undefined` \| `Date`

The value if it can be coerced.

**`Throws`**

TypeError If the value can not be coerced.

#### Defined in

[packages/core/src/utils/coerce.ts:119](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/coerce.ts#L119)

___

### number

▸ **number**(`value`): `undefined` \| `number`

Coerce the value to a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to coerce. |

#### Returns

`undefined` \| `number`

The value if it can be coerced.

**`Throws`**

TypeError If the value can not be coerced.

#### Defined in

[packages/core/src/utils/coerce.ts:41](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/coerce.ts#L41)

___

### string

▸ **string**(`value`): `undefined` \| `string`

Coerce the value to a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to coerce. |

#### Returns

`undefined` \| `string`

The value if it can be coerced.

**`Throws`**

TypeError If the value can not be coerced.

#### Defined in

[packages/core/src/utils/coerce.ts:17](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/coerce.ts#L17)

___

### time

▸ **time**(`value`): `undefined` \| `Date`

Coerce the value to a time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to coerce. |

#### Returns

`undefined` \| `Date`

The value if it can be coerced.

**`Throws`**

TypeError If the value can not be coerced.

#### Defined in

[packages/core/src/utils/coerce.ts:143](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/coerce.ts#L143)
