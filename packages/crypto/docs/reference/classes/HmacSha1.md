# Class: HmacSha1

Class to help with HmacSha1 scheme.
TypeScript conversion from https://github.com/emn178/js-sha1.

## Constructors

### new HmacSha1()

> **new HmacSha1**(`key`): [`HmacSha1`](HmacSha1.md)

Create a new instance of HmacSha1.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

#### Returns

[`HmacSha1`](HmacSha1.md)

## Methods

### digest()

> **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.

***

### update()

> **update**(`message`): [`HmacSha1`](HmacSha1.md)

Update the hash with the data.

#### Parameters

• **message**: `Uint8Array`

The data to update the hash with.

#### Returns

[`HmacSha1`](HmacSha1.md)

The instance for chaining.

***

### sum()

> `static` **sum**(`key`, `data`): `Uint8Array`

Perform Sum on the data.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **data**: `Uint8Array`

The data to operate on.

#### Returns

`Uint8Array`

The sum of the data.
