# Class: PropertyHelper

Class to help with properties.

## Constructors

### new PropertyHelper()

> **new PropertyHelper**(): [`PropertyHelper`](PropertyHelper.md)

#### Returns

[`PropertyHelper`](PropertyHelper.md)

## Methods

### getValue()

> `static` **getValue**\<`T`\>(`properties`, `key`, `type`?): `undefined` \| `T`

Get property with the specific key.

#### Type parameters

• **T**

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to look in.

• **key**: `string`

The key of the item to find.

• **type?**: `string`

Will only return the value if the type matches or is undefined.

#### Returns

`undefined` \| `T`

The item if it was found.

***

### setValue()

> `static` **setValue**\<`T`\>(`properties`, `key`, `type`, `value`): `void`

Set a property in to the list.

#### Type parameters

• **T**

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **type**: `string`

The type of the item to add.

• **value**: `undefined` \| `T`

The value of the item to add.

#### Returns

`void`

***

### removeValue()

> `static` **removeValue**(`properties`, `key`): `void`

Remove property with the specific key.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to look in.

• **key**: `string`

The key of the item to remove.

#### Returns

`void`

***

### getText()

> `static` **getText**(`properties`, `key`): `undefined` \| `string`

Get some text from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `string`

The value if found.

***

### setText()

> `static` **setText**(`properties`, `key`, `value`): `void`

Set some text in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `string`

The value of the item to add.

#### Returns

`void`

***

### getUrn()

> `static` **getUrn**(`properties`, `key`): `undefined` \| `string`

Get a urn from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `string`

The value if found.

***

### setUrn()

> `static` **setUrn**(`properties`, `key`, `value`): `void`

Set a urn in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `string`

The value of the item to add.

#### Returns

`void`

***

### getInteger()

> `static` **getInteger**(`properties`, `key`): `undefined` \| `number`

Get an integer from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setInteger()

> `static` **setInteger**(`properties`, `key`, `value`): `void`

Set an integer in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

#### Returns

`void`

***

### getFloat()

> `static` **getFloat**(`properties`, `key`): `undefined` \| `number`

Get a float from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setFloat()

> `static` **setFloat**(`properties`, `key`, `value`): `void`

Set a float in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

#### Returns

`void`

***

### getBoolean()

> `static` **getBoolean**(`properties`, `key`): `undefined` \| `boolean`

Get a boolean from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `boolean`

The value if found.

***

### setBoolean()

> `static` **setBoolean**(`properties`, `key`, `value`): `void`

Set a boolean in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `boolean`

The value of the item to add.

#### Returns

`void`

***

### getDateTime()

> `static` **getDateTime**(`properties`, `key`): `undefined` \| `Date`

Get a date time from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `Date`

The value if found.

***

### setDateTime()

> `static` **setDateTime**(`properties`, `key`, `value`): `void`

Set a date time in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `Date`

The value of the item to add.

#### Returns

`void`

***

### getDate()

> `static` **getDate**(`properties`, `key`): `undefined` \| `Date`

Get a date from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `Date`

The value if found.

***

### setDate()

> `static` **setDate**(`properties`, `key`, `value`): `void`

Set a date in ISO format in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `Date`

The value of the item to add.

#### Returns

`void`

***

### getTime()

> `static` **getTime**(`properties`, `key`): `undefined` \| `Date`

Get a time from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `Date`

The value if found.

***

### setTime()

> `static` **setTime**(`properties`, `key`, `value`): `void`

Set a time in standard format in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `Date`

The value of the item to add.

#### Returns

`void`

***

### getTimestampMilliseconds()

> `static` **getTimestampMilliseconds**(`properties`, `key`): `undefined` \| `number`

Get a timestamp in milliseconds from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setTimestampMilliseconds()

> `static` **setTimestampMilliseconds**(`properties`, `key`, `value`): `void`

Set a timestamp in milliseconds in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

#### Returns

`void`

***

### getTimestampSeconds()

> `static` **getTimestampSeconds**(`properties`, `key`): `undefined` \| `number`

Get a timestamp in seconds from the list.

#### Parameters

• **properties**: `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setTimestampSeconds()

> `static` **setTimestampSeconds**(`properties`, `key`, `value`): `void`

Set a timestamp in seconds in to the list.

#### Parameters

• **properties**: [`IProperty`](../interfaces/IProperty.md)[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

#### Returns

`void`

***

### filterInclude()

> `static` **filterInclude**\<`T`\>(`properties`?, `includeKeys`?): `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

Reduce the keys in the property list.

#### Type parameters

• **T** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties?**: `T`[]

The properties list to filter.

• **includeKeys?**: `string`[]

The keys to include.

#### Returns

`undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The filtered list.

***

### filterExclude()

> `static` **filterExclude**\<`T`\>(`properties`?, `excludeKeys`?): `undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

Filter the keys from the properties.

#### Type parameters

• **T** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties?**: `T`[]

The properties list to filter.

• **excludeKeys?**: `string`[]

The keys to filter.

#### Returns

`undefined` \| [`IProperty`](../interfaces/IProperty.md)[]

The filtered list.

***

### merge()

> `static` **merge**(`properties1`?, `properties2`?): [`IProperty`](../interfaces/IProperty.md)[]

Merge two property lists.

#### Parameters

• **properties1?**: [`IProperty`](../interfaces/IProperty.md)[]

The current profile properties.

• **properties2?**: [`IProperty`](../interfaces/IProperty.md)[]

The new properties to merge in to the first list.

#### Returns

[`IProperty`](../interfaces/IProperty.md)[]

The merged list.
