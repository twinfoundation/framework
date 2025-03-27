# Class: Blake3

Class to help with Blake3 Signature scheme.

## Constructors

### new Blake3()

> **new Blake3**(`outputLength`, `key`?): [`Blake3`](Blake3.md)

Create a new instance of Blake3.

#### Parameters

##### outputLength

`number`

The output length.

##### key?

`Uint8Array`\<`ArrayBufferLike`\>

Optional key for the hash.

#### Returns

[`Blake3`](Blake3.md)

## Properties

### SIZE\_256

> `static` **SIZE\_256**: `number` = `32`

Blake3 256.

***

### SIZE\_512

> `static` **SIZE\_512**: `number` = `64`

Blake3 512.

## Methods

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

> **update**(`block`): [`Blake3`](Blake3.md)

Update the hash with the block.

#### Parameters

##### block

`Uint8Array`

The block to update the hash with.

#### Returns

[`Blake3`](Blake3.md)

The instance for chaining.

***

### digest()

> **digest**(): `Uint8Array`

Get the digest for the hash.

#### Returns

`Uint8Array`

The instance for chaining.
