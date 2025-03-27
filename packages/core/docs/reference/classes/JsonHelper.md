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

##### object

`unknown`

The object to be serialized.

#### Returns

`string`

The serialized object.

***

### diff()

> `static` **diff**\<`T`\>(`object1`, `object2`): [`IPatchOperation`](../interfaces/IPatchOperation.md)[]

Creates a RFC 6902 diff set.
Based on https://www.rfc-editor.org/rfc/rfc6902.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### object1

`T`

The first object.

##### object2

`T`

The second object.

#### Returns

[`IPatchOperation`](../interfaces/IPatchOperation.md)[]

The list of patches.

***

### patch()

> `static` **patch**\<`T`\>(`object`, `patches`): `T`

Applies a RFC 6902 diff set to an object.
Based on https://www.rfc-editor.org/rfc/rfc6902.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### object

`T`

The object to patch.

##### patches

[`IPatchOperation`](../interfaces/IPatchOperation.md)[]

The second object.

#### Returns

`T`

The updated object.

#### Throws

GeneralError if the patch fails.

***

### stringifyEx()

> `static` **stringifyEx**(`object`, `space`?): `string`

Stringify the JSON with support for extended data types date/bigint/uint8array.

#### Parameters

##### object

`any`

The object to stringify.

##### space?

Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.

`string` | `number`

#### Returns

`string`

The stringified object.

***

### parseEx()

> `static` **parseEx**(`json`): `any`

Parse the JSON string with support for extended data types date/bigint/uint8array.

#### Parameters

##### json

`string`

The object to pause.

#### Returns

`any`

The object.

***

### stringifyExReplacer()

> `static` **stringifyExReplacer**(`this`, `key`, `value`): `unknown`

Replacer function to handle extended data types.

#### Parameters

##### this

`any`

The object.

##### key

`string`

The key.

##### value

`unknown`

The value.

#### Returns

`unknown`

The value.

***

### parseExReviver()

> `static` **parseExReviver**(`this`, `key`, `value`): `unknown`

Reviver function to handle extended data types.

#### Parameters

##### this

`any`

The object.

##### key

`string`

The key.

##### value

`unknown`

The value.

#### Returns

`unknown`

The value.
