# Class: ObjectHelper

Class to help with objects.

## Constructors

### new ObjectHelper()

> **new ObjectHelper**(): [`ObjectHelper`](ObjectHelper.md)

#### Returns

[`ObjectHelper`](ObjectHelper.md)

## Methods

### toBytes()

> `static` **toBytes**\<`T`\>(`obj`, `format`): `Uint8Array`

Convert an object to bytes.

#### Type parameters

• **T**

#### Parameters

• **obj**: `undefined` \| `T`

The object to convert.

• **format**: `boolean`= `false`

Format the JSON content.

#### Returns

`Uint8Array`

The object as bytes.

***

### fromBytes()

> `static` **fromBytes**\<`T`\>(`bytes`): `T`

Convert a bytes to an object.

#### Type parameters

• **T**

#### Parameters

• **bytes**: `undefined` \| `null` \| `Uint8Array`

The bytes to convert to an object.

#### Returns

`T`

The object.

#### Throws

GeneralError if there was an error parsing the JSON.

***

### clone()

> `static` **clone**\<`T`\>(`obj`): `T`

Make a deep clone of an object.

#### Type parameters

• **T**

#### Parameters

• **obj**: `T`

The object to clone.

#### Returns

`T`

The objects clone.

***

### equal()

> `static` **equal**\<`T`\>(`obj1`, `obj2`): `boolean`

Does one object equal another.

#### Type parameters

• **T**

#### Parameters

• **obj1**: `T`

The first object to compare.

• **obj2**: `T`

The second object to compare.

#### Returns

`boolean`

True is the objects are equal.

***

### propertyGet()

> `static` **propertyGet**(`obj`, `property`): `unknown`

Get the property of an unknown object.

#### Parameters

• **obj**: `unknown`

The object to get the property from.

• **property**: `string`

The property to get.

#### Returns

`unknown`

The property.

***

### propertySet()

> `static` **propertySet**(`obj`, `property`, `value`): `void`

Set the property of an unknown object.

#### Parameters

• **obj**: `unknown`

The object to set the property from.

• **property**: `string`

The property to set.

• **value**: `unknown`

The value to set.

#### Returns

`void`

***

### pick()

> `static` **pick**\<`T`\>(`obj`, `keys`?): `Partial`\<`T`\>

Pick a subset of properties from an object.

#### Type parameters

• **T**

#### Parameters

• **obj**: `T`

The object to pick the properties from.

• **keys?**: keyof `T`[]

The property keys to pick.

#### Returns

`Partial`\<`T`\>

The partial object.
