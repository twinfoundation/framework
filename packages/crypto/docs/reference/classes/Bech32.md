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

### encode5BitArray()

> `static` **encode5BitArray**(`humanReadablePart`, `data5Bit`): `string`

Encode the 5 bit data buffer.

#### Parameters

• **humanReadablePart**: `string`

The header.

• **data5Bit**: `Uint8Array`

The data to encode.

#### Returns

`string`

The encoded data.

***

### decode()

> `static` **decode**(`bech`): `undefined` \| `object`

Decode a bech32 string.

#### Parameters

• **bech**: `string`

The text to decode.

#### Returns

`undefined` \| `object`

The decoded data or undefined if it could not be decoded.

***

### decodeTo5BitArray()

> `static` **decodeTo5BitArray**(`bech`): `undefined` \| `object`

Decode a bech32 string to 5 bit array.

#### Parameters

• **bech**: `string`

The text to decode.

#### Returns

`undefined` \| `object`

The decoded data or undefined if it could not be decoded.

#### Throws

GeneralError if the bech32 string is invalid.

***

### to5Bit()

> `static` **to5Bit**(`bytes`): `Uint8Array`

Convert the input bytes into 5 bit data.

#### Parameters

• **bytes**: `Uint8Array`

The bytes to convert.

#### Returns

`Uint8Array`

The data in 5 bit form.

***

### from5Bit()

> `static` **from5Bit**(`fiveBit`): `Uint8Array`

Convert the 5 bit data to 8 bit.

#### Parameters

• **fiveBit**: `Uint8Array`

The 5 bit data to convert.

#### Returns

`Uint8Array`

The 5 bit data converted to 8 bit.

***

### matches()

> `static` **matches**(`humanReadablePart`, `bech32Text`?): `boolean`

Does the given string match the bech32 pattern.

#### Parameters

• **humanReadablePart**: `string`

The human readable part.

• **bech32Text?**: `string`

The text to test.

#### Returns

`boolean`

True if this is potentially a match.
