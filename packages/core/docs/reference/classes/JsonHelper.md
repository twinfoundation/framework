# Class: JsonHelper

Helpers methods for JSON objects.
Based on https://www.rfc-editor.org/rfc/rfc8785

## Constructors

### new JsonHelper()

> **new JsonHelper**(): [`JsonHelper`](JsonHelper.md)

#### Returns

[`JsonHelper`](JsonHelper.md)

## Methods

### canonicalize()

> `static` **canonicalize**\<`T`\>(`object`): `string`

Serializes in canonical format.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **object**: `T`

The object to be serialized.

#### Returns

`string`

The serialized object.
