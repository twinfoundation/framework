# Class: Blake2b

Class to help with Blake2B Signature scheme.

## Constructors

### new Blake2b()

> **new Blake2b**(`outputLength`, `key`?): [`Blake2b`](Blake2b.md)

Create a new instance of Blake2b.

#### Parameters

##### outputLength

`number`

The output length.

##### key?

`Uint8Array`\<`ArrayBufferLike`\>

Optional key for the hash.

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

### sum160()

> `static` **sum160**(`block`, `key`?): `Uint8Array`

Perform Sum 160 on the block.

#### Parameters

##### block

`Uint8Array`

The block to operate on.

##### key?

`Uint8Array`\<`ArrayBufferLike`\>

Optional key for the hash.

#### Returns

`Uint8Array`

The sum 160 of the block.

***

### sum256()

> `static` **sum256**(`block`, `key`?): `Uint8Array`

Perform Sum 256 on the block.

#### Parameters

##### block

`Uint8Array`

The block to operate on.

##### key?

`Uint8Array`\<`ArrayBufferLike`\>

Optional key for the hash.

#### Returns

`Uint8Array`

The sum 256 of the block.

***

### sum512()

> `static` **sum512**(`block`, `key`?): `Uint8Array`

Perform Sum 512 on the block.

#### Parameters

##### block

`Uint8Array`

The block to operate on.

##### key?

`Uint8Array`\<`ArrayBufferLike`\>

Optional key for the hash.

#### Returns

`Uint8Array`

The sum 512 of the block.

***

### update()

> **update**(`block`): [`Blake2b`](Blake2b.md)

Update the hash with the block.

#### Parameters

##### block

`Uint8Array`

The block to update the hash with.

#### Returns

[`Blake2b`](Blake2b.md)

The instance for chaining.

***

### digest()

> **digest**(): `Uint8Array`

Get the digest for the hash.

#### Returns

`Uint8Array`

The instance for chaining.
