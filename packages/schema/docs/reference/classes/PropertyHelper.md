# Class: PropertyHelper

Class to help with properties.

## Constructors

### new PropertyHelper()

> **new PropertyHelper**(): [`PropertyHelper`](PropertyHelper.md)

#### Returns

[`PropertyHelper`](PropertyHelper.md)

## Methods

### getValue()

> `static` **getValue**\<`T`, `U`\>(`properties`, `key`, `type`?): `undefined` \| `T`

Get property with the specific key.

#### Type parameters

• **T**

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

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

> `static` **setValue**\<`T`, `U`\>(`properties`, `key`, `type`, `value`, `additionalProperties`?): `void`

Set a property in to the list.

#### Type parameters

• **T**

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **type**: `string`

The type of the item to add.

• **value**: `undefined` \| `T`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### removeValue()

> `static` **removeValue**\<`U`\>(`properties`, `key`): `void`

Remove property with the specific key.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to look in.

• **key**: `string`

The key of the item to remove.

#### Returns

`void`

***

### getText()

> `static` **getText**\<`U`\>(`properties`, `key`): `undefined` \| `string`

Get some text from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `string`

The value if found.

***

### setText()

> `static` **setText**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set some text in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `string`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getUrn()

> `static` **getUrn**\<`U`\>(`properties`, `key`): `undefined` \| `string`

Get a urn from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `string`

The value if found.

***

### setUrn()

> `static` **setUrn**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a urn in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `string`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getInteger()

> `static` **getInteger**\<`U`\>(`properties`, `key`): `undefined` \| `number`

Get an integer from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setInteger()

> `static` **setInteger**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set an integer in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getFloat()

> `static` **getFloat**\<`U`\>(`properties`, `key`): `undefined` \| `number`

Get a float from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setFloat()

> `static` **setFloat**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a float in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getBoolean()

> `static` **getBoolean**\<`U`\>(`properties`, `key`): `undefined` \| `boolean`

Get a boolean from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `boolean`

The value if found.

***

### setBoolean()

> `static` **setBoolean**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a boolean in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `boolean`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getDateTime()

> `static` **getDateTime**\<`U`\>(`properties`, `key`): `undefined` \| `Date`

Get a date time from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `Date`

The value if found.

***

### setDateTime()

> `static` **setDateTime**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a date time in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `Date`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getDate()

> `static` **getDate**\<`U`\>(`properties`, `key`): `undefined` \| `Date`

Get a date from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `Date`

The value if found.

***

### setDate()

> `static` **setDate**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a date in ISO format in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `Date`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getTime()

> `static` **getTime**\<`U`\>(`properties`, `key`): `undefined` \| `Date`

Get a time from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `Date`

The value if found.

***

### setTime()

> `static` **setTime**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a time in standard format in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `Date`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getTimestampMilliseconds()

> `static` **getTimestampMilliseconds**\<`U`\>(`properties`, `key`): `undefined` \| `number`

Get a timestamp in milliseconds from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setTimestampMilliseconds()

> `static` **setTimestampMilliseconds**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a timestamp in milliseconds in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### getTimestampSeconds()

> `static` **getTimestampSeconds**\<`U`\>(`properties`, `key`): `undefined` \| `number`

Get a timestamp in seconds from the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to get from.

• **key**: `string`

The key of the item to add.

#### Returns

`undefined` \| `number`

The value if found.

***

### setTimestampSeconds()

> `static` **setTimestampSeconds**\<`U`\>(`properties`, `key`, `value`, `additionalProperties`?): `void`

Set a timestamp in seconds in to the list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties**: `undefined` \| `U`[]

The properties list to add to.

• **key**: `string`

The key of the item to add.

• **value**: `undefined` \| `number`

The value of the item to add.

• **additionalProperties?**: \{ \[key in string \| number \| symbol\]?: unknown \}

Additional properties to add to the item.

#### Returns

`void`

***

### filterInclude()

> `static` **filterInclude**\<`U`\>(`properties`?, `includeKeys`?): `undefined` \| `U`[]

Reduce the keys in the property list.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties?**: `U`[]

The properties list to filter.

• **includeKeys?**: `string`[]

The keys to include.

#### Returns

`undefined` \| `U`[]

The filtered list.

***

### filterExclude()

> `static` **filterExclude**\<`U`\>(`properties`?, `excludeKeys`?): `undefined` \| `U`[]

Filter the keys from the properties.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties?**: `U`[]

The properties list to filter.

• **excludeKeys?**: `string`[]

The keys to filter.

#### Returns

`undefined` \| `U`[]

The filtered list.

***

### merge()

> `static` **merge**\<`U`\>(`properties1`?, `properties2`?): `U`[]

Merge two property lists.

#### Type parameters

• **U** *extends* [`IProperty`](../interfaces/IProperty.md) = [`IProperty`](../interfaces/IProperty.md)

#### Parameters

• **properties1?**: `U`[]

The current profile properties.

• **properties2?**: `U`[]

The new properties to merge in to the first list.

#### Returns

`U`[]

The merged list.
