# Class: HmacSha512

Class to help with HmacSha512 scheme.

## Constructors

### new HmacSha512()

> **new HmacSha512**(`key`, `bits`): [`HmacSha512`](HmacSha512.md)

Create a new instance of HmacSha512.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **bits**: `number`= `HmacSha512.SIZE_512`

The number of bits.

#### Returns

[`HmacSha512`](HmacSha512.md)

## Properties

### SIZE\_224

> `static` **SIZE\_224**: `number` = `224`

Sha512 224.

***

### SIZE\_256

> `static` **SIZE\_256**: `number` = `256`

Sha512 256.

***

### SIZE\_384

> `static` **SIZE\_384**: `number` = `384`

Sha512 384.

***

### SIZE\_512

> `static` **SIZE\_512**: `number` = `512`

Sha512 512.

## Methods

### digest()

> **digest**(): `Uint8Array`

Get the digest for the hash.

#### Returns

`Uint8Array`

The instance for chaining.

***

### update()

> **update**(`block`): [`HmacSha512`](HmacSha512.md)

Update the hash with the block.

#### Parameters

• **block**: `Uint8Array`

The block to update the hash with.

#### Returns

[`HmacSha512`](HmacSha512.md)

The instance for chaining.

***

### sum224()

> `static` **sum224**(`key`, `block`): `Uint8Array`

Perform Sum 224 on the block.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 224 of the block.

***

### sum256()

> `static` **sum256**(`key`, `block`): `Uint8Array`

Perform Sum 256 on the block.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 256 of the block.

***

### sum384()

> `static` **sum384**(`key`, `block`): `Uint8Array`

Perform Sum 384 on the block.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 384 of the block.

***

### sum512()

> `static` **sum512**(`key`, `block`): `Uint8Array`

Perform Sum 512 on the block.

#### Parameters

• **key**: `Uint8Array`

The key for the hmac.

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 512 of the block.
