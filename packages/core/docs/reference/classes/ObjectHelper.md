# Class: ObjectHelper

Class to help with objects.

## Constructors

### constructor

• **new ObjectHelper**(): [`ObjectHelper`](ObjectHelper.md)

#### Returns

[`ObjectHelper`](ObjectHelper.md)

## Methods

### clone

▸ **clone**\<`T`\>(`obj`): `undefined` \| `T`

Make a deep clone of an object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `T` | The object to clone. |

#### Returns

`undefined` \| `T`

The objects clone.

___

### equal

▸ **equal**\<`T`\>(`obj1`, `obj2`): `boolean`

Does one object equal another.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj1` | `T` | The first object to compare. |
| `obj2` | `T` | The second object to compare. |

#### Returns

`boolean`

True is the objects are equal.

___

### fromBytes

▸ **fromBytes**\<`T`\>(`bytes`): `T`

Convert a bytes to an object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `undefined` \| ``null`` \| `Uint8Array` | The bytes to convert to an object. |

#### Returns

`T`

The object.

**`Throws`**

GeneralError if there was an error parsing the JSON.

___

### propertyGet

▸ **propertyGet**(`obj`, `property`): `unknown`

Get the property of an unknown object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `unknown` | The object to get the property from. |
| `property` | `string` | The property to get. |

#### Returns

`unknown`

The property.

___

### propertySet

▸ **propertySet**(`obj`, `property`, `value`): `void`

Set the property of an unknown object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `unknown` | The object to set the property from. |
| `property` | `string` | The property to set. |
| `value` | `unknown` | The value to set. |

#### Returns

`void`

___

### toBytes

▸ **toBytes**\<`T`\>(`obj`, `format?`): `Uint8Array`

Convert an object to bytes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `undefined` \| `T` | `undefined` | The object to convert. |
| `format` | `boolean` | `false` | Format the JSON content. |

#### Returns

`Uint8Array`

The object as bytes.
