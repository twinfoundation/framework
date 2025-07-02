# Class: ArrayHelper

Class to help with arrays.

## Constructors

### Constructor

> **new ArrayHelper**(): `ArrayHelper`

#### Returns

`ArrayHelper`

## Methods

### matches()

> `static` **matches**(`arr1`, `arr2`): `boolean`

Do the two arrays match.

#### Parameters

##### arr1

`unknown`

The first array.

##### arr2

`unknown`

The second array.

#### Returns

`boolean`

True if both arrays are empty of have the same values.

***

### fromObjectOrArray()

Convert an object or array to an array.

#### Param

The object or array to convert.

#### Call Signature

> `static` **fromObjectOrArray**\<`T`\>(`value`): `undefined`

Convert an object or array to an array.

##### Type Parameters

###### T

`T` = `unknown`

##### Parameters

###### value

`undefined`

The object or array to convert.

##### Returns

`undefined`

The array.

##### Param

The object or array to convert.

#### Call Signature

> `static` **fromObjectOrArray**\<`T`\>(`value`): `T`[]

Convert an object or array to an array.

##### Type Parameters

###### T

`T` = `unknown`

##### Parameters

###### value

[`ObjectOrArray`](../type-aliases/ObjectOrArray.md)\<`T`\>

The object or array to convert.

##### Returns

`T`[]

The array.

##### Param

The object or array to convert.
