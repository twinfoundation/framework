# Class: Compression

A class to handle compression.

## Constructors

### Constructor

> **new Compression**(): `Compression`

#### Returns

`Compression`

## Methods

### compress()

> `static` **compress**(`bytes`, `type`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Compress bytes using GZIP.

#### Parameters

##### bytes

`Uint8Array`

The bytes to compress.

##### type

[`CompressionType`](../type-aliases/CompressionType.md)

The type of compression to use.

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

The compressed bytes.

***

### decompress()

> `static` **decompress**(`compressedBytes`, `type`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Decompress a gzipped compressed byte array.

#### Parameters

##### compressedBytes

`Uint8Array`

The compressed bytes.

##### type

[`CompressionType`](../type-aliases/CompressionType.md)

The type of compression to use.

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

The decompressed bytes.
