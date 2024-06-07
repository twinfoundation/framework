# Class: Bech32

Bech32 encoding and decoding.

## Constructors

### new Bech32()

> **new Bech32**(): [`Bech32`](Bech32.md)

#### Returns

[`Bech32`](Bech32.md)

## Methods

### encode()

> `static` **encode**(`humanReadablePart`, `data`): `string`

Encode the buffer.

#### Parameters

• **humanReadablePart**: `string`

The header.

• **data**: `Uint8Array`

The data to encode.

#### Returns

`string`

The encoded data.

***

### decode()

> `static` **decode**(`bech`): `object`

Decode a bech32 string.

#### Parameters

• **bech**: `string`

The text to decode.

#### Returns

`object`

The decoded data or undefined if it could not be decoded.

##### humanReadablePart

> **humanReadablePart**: `string`

##### data

> **data**: `Uint8Array`

#### Throws

An error if the decoding fails.

***

### isBech32()

> `static` **isBech32**(`bech`): `bech is string`

Is the input a bech 32 address.

#### Parameters

• **bech**: `unknown`

The value to test.

#### Returns

`bech is string`

True if this is potentially a match.
