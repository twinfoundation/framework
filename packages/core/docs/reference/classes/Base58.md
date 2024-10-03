# Class: Base58

Class to help with base58 Encoding/Decoding.

## Constructors

### new Base58()

> **new Base58**(): [`Base58`](Base58.md)

#### Returns

[`Base58`](Base58.md)

## Methods

### decode()

> `static` **decode**(`base58`): `Uint8Array`

Convert the base 58 string to a byte array.

#### Parameters

• **base58**: `string`

The base58 string to convert.

#### Returns

`Uint8Array`

The byte array.

#### Throws

If the input string contains a character not in the Base58 alphabet.

***

### encode()

> `static` **encode**(`bytes`): `string`

Convert a byte array to base 58.

#### Parameters

• **bytes**: `Uint8Array`

The byte array to encode.

#### Returns

`string`

The data as base58 string.
