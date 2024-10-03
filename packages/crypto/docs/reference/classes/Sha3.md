# Class: Sha3

Perform a SHA-3 hash on the block.

## Constructors

### new Sha3()

> **new Sha3**(`bits`): [`Sha3`](Sha3.md)

Create a new instance of Sha3.

#### Parameters

• **bits**: `number` = `Sha3.SIZE_256`

The number of bits.

#### Returns

[`Sha3`](Sha3.md)

## Properties

### SIZE\_224

> `readonly` `static` **SIZE\_224**: `number` = `224`

Sha3 224.

***

### SIZE\_256

> `readonly` `static` **SIZE\_256**: `number` = `256`

Sha3 256.

***

### SIZE\_384

> `readonly` `static` **SIZE\_384**: `number` = `384`

Sha3 384.

***

### SIZE\_512

> `readonly` `static` **SIZE\_512**: `number` = `512`

Sha3 512.

## Methods

### sum256()

> `static` **sum256**(`block`): `Uint8Array`

Perform Sum 256 on the block.

#### Parameters

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 256 of the block.

***

### sum224()

> `static` **sum224**(`block`): `Uint8Array`

Perform Sum 224 on the block.

#### Parameters

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 224 of the block.

***

### sum384()

> `static` **sum384**(`block`): `Uint8Array`

Perform Sum 384 on the block.

#### Parameters

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 384 of the block.

***

### sum512()

> `static` **sum512**(`block`): `Uint8Array`

Perform Sum 512 on the block.

#### Parameters

• **block**: `Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum 512 of the block.

***

### update()

> **update**(`block`): [`Sha3`](Sha3.md)

Update the hash with the block.

#### Parameters

• **block**: `Uint8Array`

The block to update the hash with.

#### Returns

[`Sha3`](Sha3.md)

The instance for chaining.

***

### digest()

> **digest**(): `Uint8Array`

Get the digest for the hash.

#### Returns

`Uint8Array`

The instance for chaining.
