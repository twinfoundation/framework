# Class: Sha1

Perform a SHA-1 hash on the block.

## Constructors

### Constructor

> **new Sha1**(): `Sha1`

Create a new instance of Sha1.

#### Returns

`Sha1`

## Methods

### sum()

> `static` **sum**(`block`): `Uint8Array`

Perform Sum on the block.

#### Parameters

##### block

`Uint8Array`

The block to operate on.

#### Returns

`Uint8Array`

The sum of the block.

***

### update()

> **update**(`block`): `Sha1`

Update the hash with the block.

#### Parameters

##### block

`Uint8Array`

The block to update the hash with.

#### Returns

`Sha1`

The instance for chaining.

***

### digest()

> **digest**(): `Uint8Array`

Get the digest for the hash.

#### Returns

`Uint8Array`

The instance for chaining.
