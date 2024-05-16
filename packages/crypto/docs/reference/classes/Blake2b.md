# Class: Blake2b

Class to help with Blake2B Signature scheme.
TypeScript conversion from https://github.com/dcposch/blakejs.

## Constructors

### new Blake2b()

> **new Blake2b**(`outLen`, `key`?): [`Blake2b`](Blake2b.md)

Create a new instance of Blake2b.

#### Parameters

• **outLen**: `number`

Output length between 1 and 64 bytes.

• **key?**: `Uint8Array`

Optional key.

#### Returns

[`Blake2b`](Blake2b.md)

## Properties

### SIZE\_160

> `static` **SIZE\_160**: `number` = `20`

Blake2b 160.

***

### SIZE\_256

> `static` **SIZE\_256**: `number` = `32`

Blake2b 256.

***

### SIZE\_512

> `static` **SIZE\_512**: `number` = `64`

Blake2b 512.

## Methods

### final()

> **final**(): `Uint8Array`

Completes a BLAKE2b streaming hash.

#### Returns

`Uint8Array`

The final data.

***

### init()

> `private` **init**(`outputLength`, `key`?): `void`

Creates a BLAKE2b hashing context.

#### Parameters

• **outputLength**: `number`

Output length between 1 and 64 bytes.

• **key?**: `Uint8Array`

Optional key.

#### Returns

`void`

#### Throws

Error if the output length is not between 1 and 64 bytes.

***

### update()

> **update**(`input`): `void`

Updates a BLAKE2b streaming hash.

#### Parameters

• **input**: `Uint8Array`

The data to hash.

#### Returns

`void`

***

### sum160()

> `static` **sum160**(`data`, `key`?): `Uint8Array`

Perform Sum 160 on the data.

#### Parameters

• **data**: `Uint8Array`

The data to operate on.

• **key?**: `Uint8Array`

Optional key for the hash.

#### Returns

`Uint8Array`

The sum 160 of the data.

***

### sum256()

> `static` **sum256**(`data`, `key`?): `Uint8Array`

Perform Sum 256 on the data.

#### Parameters

• **data**: `Uint8Array`

The data to operate on.

• **key?**: `Uint8Array`

Optional key for the hash.

#### Returns

`Uint8Array`

The sum 256 of the data.

***

### sum512()

> `static` **sum512**(`data`, `key`?): `Uint8Array`

Perform Sum 512 on the data.

#### Parameters

• **data**: `Uint8Array`

The data to operate on.

• **key?**: `Uint8Array`

Optional key for the hash.

#### Returns

`Uint8Array`

The sum 512 of the data.
