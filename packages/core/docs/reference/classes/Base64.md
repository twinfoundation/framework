# Class: Base64

Class to help with base64 Encoding/Decoding.
Sourced from https://github.com/beatgammit/base64-js.

## Constructors

### new Base64()

> **new Base64**(): [`Base64`](Base64.md)

#### Returns

[`Base64`](Base64.md)

## Methods

### byteLength()

> `static` **byteLength**(`base64`): `number`

Get the byte length of the data.

#### Parameters

• **base64**: `string`

The base64 string.

#### Returns

`number`

The byte length of the data.

***

### decode()

> `static` **decode**(`base64`): `Uint8Array`

Convert the base 64 string to a byte array.

#### Parameters

• **base64**: `string`

The base64 string to convert.

#### Returns

`Uint8Array`

The byte array.

***

### encode()

> `static` **encode**(`bytes`): `string`

Convert a byte array to base 64.

#### Parameters

• **bytes**: `Uint8Array`

The byte array to convert.

#### Returns

`string`

The data as base64 string.
