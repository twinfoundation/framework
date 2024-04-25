# Class: Compression

A class to handle compression.

## Constructors

### constructor

• **new Compression**(): [`Compression`](Compression.md)

#### Returns

[`Compression`](Compression.md)

## Methods

### compress

▸ **compress**(`bytes`, `type`): `Promise`\<`Uint8Array`\>

Compress bytes using GZIP.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The bytes to compress. |
| `type` | [`CompressionType`](../modules.md#compressiontype) | The type of compression to use. |

#### Returns

`Promise`\<`Uint8Array`\>

The compressed bytes.

___

### decompress

▸ **decompress**(`compressedBytes`, `type`): `Promise`\<`Uint8Array`\>

Decompress a gzipped compressed byte array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compressedBytes` | `Uint8Array` | The compressed bytes. |
| `type` | [`CompressionType`](../modules.md#compressiontype) | The type of compression to use. |

#### Returns

`Promise`\<`Uint8Array`\>

The decompressed bytes.
