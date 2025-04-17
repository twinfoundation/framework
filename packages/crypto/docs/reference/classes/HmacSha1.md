# Class: HmacSha1

Class to help with HmacSha1 scheme.

## Constructors

### Constructor

> **new HmacSha1**(`key`): `HmacSha1`

Create a new instance of HmacSha1.

#### Parameters

##### key

`Uint8Array`

The key for the hmac.

#### Returns

`HmacSha1`

## Methods

### sum()

> `static` **sum**(`key`, `block`): `Uint8Array`

Perform Sum on the block.

#### Parameters

##### key

`Uint8Array`

The key for the hmac.

##### block

`Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum of the block.

***

### update()

> **update**(`block`): `HmacSha1`

Update the hash with the block.

#### Parameters

##### block

`Uint8Array`

The block to update the hash with.

#### Returns

`HmacSha1`

The instance for chaining.

***

### digest()

> **digest**(): `Uint8Array`

Get the digest for the hash.

#### Returns

`Uint8Array`

The instance for chaining.
