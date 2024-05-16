# Class: Sha1

Perform a SHA-1 hash on the data.

## Constructors

### new Sha1()

> **new Sha1**(): [`Sha1`](Sha1.md)

Create a new instance of Sha1.

#### Returns

[`Sha1`](Sha1.md)

## Methods

### digest()

> **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.

***

### update()

> **update**(`message`): [`Sha1`](Sha1.md)

Update the hash with the data.

#### Parameters

• **message**: `Uint8Array`

The data to update the hash with.

#### Returns

[`Sha1`](Sha1.md)

The instance for chaining.

#### Throws

Error if the hash has already been finalized.

***

### sum()

> `static` **sum**(`data`): `Uint8Array`

Perform Sum on the data.

#### Parameters

• **data**: `Uint8Array`

The data to operate on.

#### Returns

`Uint8Array`

The sum of the data.
