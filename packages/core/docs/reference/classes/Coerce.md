# Class: Coerce

Coerce an object from one type to another.

## Constructors

### Constructor

> **new Coerce**(): `Coerce`

#### Returns

`Coerce`

## Methods

### string()

> `static` **string**(`value`): `undefined` \| `string`

Coerce the value to a string.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `string`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### number()

> `static` **number**(`value`): `undefined` \| `number`

Coerce the value to a number.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `number`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### integer()

> `static` **integer**(`value`): `undefined` \| `number`

Coerce the value to an integer.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `number`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### bigint()

> `static` **bigint**(`value`): `undefined` \| `bigint`

Coerce the value to a bigint.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `bigint`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### boolean()

> `static` **boolean**(`value`): `undefined` \| `boolean`

Coerce the value to a boolean.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `boolean`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### date()

> `static` **date**(`value`): `undefined` \| `Date`

Coerce the value to a date.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `Date`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### dateTime()

> `static` **dateTime**(`value`): `undefined` \| `Date`

Coerce the value to a date/time.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `Date`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### time()

> `static` **time**(`value`): `undefined` \| `Date`

Coerce the value to a time.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `Date`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### object()

> `static` **object**\<`T`\>(`value`): `undefined` \| `T`

Coerce the value to an object.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `T`

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### uint8Array()

> `static` **uint8Array**(`value`): `undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

Coerce the value to a Uint8Array.

#### Parameters

##### value

`unknown`

The value to coerce.

#### Returns

`undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

The value if it can be coerced.

#### Throws

TypeError If the value can not be coerced.

***

### byType()

> `static` **byType**(`value`, `type?`): `unknown`

Coerces a value based on the coercion type.

#### Parameters

##### value

`unknown`

The value to coerce.

##### type?

[`CoerceType`](../type-aliases/CoerceType.md)

The coercion type to perform.

#### Returns

`unknown`

The coerced value.
