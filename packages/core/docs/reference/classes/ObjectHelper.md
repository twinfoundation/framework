# Class: ObjectHelper

Class to help with objects.

## Constructors

### Constructor

> **new ObjectHelper**(): `ObjectHelper`

#### Returns

`ObjectHelper`

## Methods

### toBytes()

> `static` **toBytes**\<`T`\>(`obj`, `format`): `Uint8Array`

Convert an object to bytes.

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

The object to convert.

`undefined` | `T`

##### format

`boolean` = `false`

Format the JSON content.

#### Returns

`Uint8Array`

The object as bytes.

***

### fromBytes()

> `static` **fromBytes**\<`T`\>(`bytes`): `T`

Convert a bytes to an object.

#### Type Parameters

##### T

`T`

#### Parameters

##### bytes

The bytes to convert to an object.

`undefined` | `null` | `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`T`

The object.

#### Throws

GeneralError if there was an error parsing the JSON.

***

### clone()

> `static` **clone**\<`T`\>(`obj`): `T`

Make a deep clone of an object.

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

The object to clone.

#### Returns

`T`

The objects clone.

***

### merge()

> `static` **merge**\<`T`, `U`\>(`obj1`, `obj2`): `T` & `U`

Deep merge objects.

#### Type Parameters

##### T

`T` = `unknown`

##### U

`U` = `unknown`

#### Parameters

##### obj1

`T`

The first object to merge.

##### obj2

`U`

The second object to merge.

#### Returns

`T` & `U`

The combined deep merge of the objects.

***

### equal()

> `static` **equal**\<`T`\>(`obj1`, `obj2`, `strictPropertyOrder?`): `boolean`

Does one object equal another.

#### Type Parameters

##### T

`T`

#### Parameters

##### obj1

`T`

The first object to compare.

##### obj2

`T`

The second object to compare.

##### strictPropertyOrder?

`boolean`

Should the properties be in the same order, defaults to true.

#### Returns

`boolean`

True is the objects are equal.

***

### propertyGet()

> `static` **propertyGet**\<`T`\>(`obj`, `property`): `undefined` \| `T`

Get the property of an unknown object.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### obj

`unknown`

The object to get the property from.

##### property

`string`

The property to get, can be separated by dots for nested path.

#### Returns

`undefined` \| `T`

The property.

***

### propertySet()

> `static` **propertySet**(`obj`, `property`, `value`): `void`

Set the property of an unknown object.

#### Parameters

##### obj

`unknown`

The object to set the property from.

##### property

`string`

The property to set.

##### value

`unknown`

The value to set.

#### Returns

`void`

#### Throws

GeneralError if the property target is not an object.

***

### propertyDelete()

> `static` **propertyDelete**(`obj`, `property`): `void`

Delete the property of an unknown object.

#### Parameters

##### obj

`unknown`

The object to set the property from.

##### property

`string`

The property to set

#### Returns

`void`

***

### extractProperty()

> `static` **extractProperty**\<`T`\>(`obj`, `propertyNames`, `removeProperties`): `undefined` \| `T`

Extract a property from the object, providing alternative names.

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`unknown`

The object to extract from.

##### propertyNames

The possible names for the property.

`string` | `string`[]

##### removeProperties

`boolean` = `true`

Remove the properties from the object, defaults to true.

#### Returns

`undefined` \| `T`

The property if available.

***

### pick()

> `static` **pick**\<`T`\>(`obj`, `keys?`): `Partial`\<`T`\>

Pick a subset of properties from an object.

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

The object to pick the properties from.

`undefined` | `T`

##### keys?

keyof `T`[]

The property keys to pick.

#### Returns

`Partial`\<`T`\>

The partial object.

***

### omit()

> `static` **omit**\<`T`\>(`obj`, `keys?`): `Partial`\<`T`\>

Omit a subset of properties from an object.

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

The object to omit the properties from.

`undefined` | `T`

##### keys?

keyof `T`[]

The property keys to omit.

#### Returns

`Partial`\<`T`\>

The partial object.

***

### toExtended()

> `static` **toExtended**(`obj`): `any`

Converter the non JSON primitives to extended types.

#### Parameters

##### obj

`any`

The object to convert.

#### Returns

`any`

The object with extended properties.

***

### fromExtended()

> `static` **fromExtended**(`obj`): `any`

Converter the extended types to non JSON primitives.

#### Parameters

##### obj

`any`

The object to convert.

#### Returns

`any`

The object with regular properties.

***

### removeEmptyProperties()

> `static` **removeEmptyProperties**\<`T`\>(`obj`, `options?`): `T`

Remove empty properties from an object.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### obj

`T`

The object to remove the empty properties from.

##### options?

The options for the removal.

###### removeUndefined?

`boolean`

Remove undefined properties, defaults to true.

###### removeNull?

`boolean`

Remove null properties, defaults to false.

#### Returns

`T`

The object with empty properties removed.
