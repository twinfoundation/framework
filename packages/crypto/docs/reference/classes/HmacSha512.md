# Class: HmacSha512

Class to help with HmacSha512 scheme.
TypeScript conversion from https://github.com/emn178/js-sha512.

## Constructors

### new HmacSha512()

> **new HmacSha512**(`key`, `bits`): [`HmacSha512`](HmacSha512.md)

Create a new instance of HmacSha512.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **bits**: `number`= `512`

The number of bits.

#### Returns

[`HmacSha512`](HmacSha512.md)

## Methods

### digest()

> **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.

***

### update()

> **update**(`message`): [`HmacSha512`](HmacSha512.md)

Update the hash with the data.

#### Parameters

• **message**: `Uint8Array`

The data to update the hash with.

#### Returns

[`HmacSha512`](HmacSha512.md)

The instance for chaining.

***

### sum512()

> `static` **sum512**(`key`, `data`): `Uint8Array`

Perform Sum 512 on the data.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **data**: `Uint8Array`

The data to operate on.

#### Returns

`Uint8Array`

The sum 512 of the data.
