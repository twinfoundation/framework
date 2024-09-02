# Class: JsonHelper

Helpers methods for JSON objects.

## Constructors

### new JsonHelper()

> **new JsonHelper**(): [`JsonHelper`](JsonHelper.md)

#### Returns

[`JsonHelper`](JsonHelper.md)

## Methods

### canonicalize()

> `static` **canonicalize**(`object`): `string`

Serializes in canonical format.
Based on https://www.rfc-editor.org/rfc/rfc8785.

#### Parameters

• **object**: `unknown`

The object to be serialized.

#### Returns

`string`

The serialized object.

***

### diff()

> `static` **diff**\<`T`\>(`object1`, `object2`): [`IPatchOperation`](../interfaces/IPatchOperation.md)[]

Creates a RFC 6902 diff set.
Based on https://www.rfc-editor.org/rfc/rfc6902.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **object1**: `T`

The first object.

• **object2**: `T`

The second object.

#### Returns

[`IPatchOperation`](../interfaces/IPatchOperation.md)[]

The list of patches.

***

### patch()

> `static` **patch**\<`T`\>(`object`, `patches`): `T`

Applies a RFC 6902 diff set to an object.
Based on https://www.rfc-editor.org/rfc/rfc6902.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **object**: `T`

The object to patch.

• **patches**: [`IPatchOperation`](../interfaces/IPatchOperation.md)[]

The second object.

#### Returns

`T`

The updated object.
