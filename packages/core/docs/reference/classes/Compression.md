# Class: Compression

A class to handle compression.

## Constructors

### new Compression()

> **new Compression**(): [`Compression`](Compression.md)

#### Returns

[`Compression`](Compression.md)

## Methods

### compress()

> `static` **compress**(`bytes`, `type`): `Promise`\<`Uint8Array`\>

Compress bytes using GZIP.

#### Parameters

• **bytes**: `Uint8Array`

The bytes to compress.

• **type**: [`CompressionType`](../type-aliases/CompressionType.md)

The type of compression to use.

#### Returns

`Promise`\<`Uint8Array`\>

The compressed bytes.

***

### decompress()

> `static` **decompress**(`compressedBytes`, `type`): `Promise`\<`Uint8Array`\>

Decompress a gzipped compressed byte array.

#### Parameters

• **compressedBytes**: `Uint8Array`

The compressed bytes.

• **type**: [`CompressionType`](../type-aliases/CompressionType.md)

The type of compression to use.

#### Returns

`Promise`\<`Uint8Array`\>

The decompressed bytes.
