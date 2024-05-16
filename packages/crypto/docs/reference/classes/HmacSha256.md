# Class: HmacSha256

Class to help with HmacSha256 scheme.
TypeScript conversion from https://github.com/emn178/js-sha256.

## Constructors

### new HmacSha256()

> **new HmacSha256**(`key`, `bits`): [`HmacSha256`](HmacSha256.md)

Create a new instance of HmacSha256.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **bits**: `number`= `256`

The number of bits.

#### Returns

[`HmacSha256`](HmacSha256.md)

## Methods

### digest()

> **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.

***

### update()

> **update**(`message`): [`HmacSha256`](HmacSha256.md)

Update the hash with the data.

#### Parameters

• **message**: `Uint8Array`

The data to update the hash with.

#### Returns

[`HmacSha256`](HmacSha256.md)

The instance for chaining.

***

### sum256()

> `static` **sum256**(`key`, `data`): `Uint8Array`

Perform Sum 256 on the data.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **data**: `Uint8Array`

The data to operate on.

#### Returns

`Uint8Array`

The sum 256 of the data.
