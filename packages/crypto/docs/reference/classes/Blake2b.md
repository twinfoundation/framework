# Class: Blake2b

Class to help with Blake2B Signature scheme.
TypeScript conversion from https://github.com/dcposch/blakejs.

## Constructors

### constructor

• **new Blake2b**(`outLen`, `key?`): [`Blake2b`](Blake2b.md)

Create a new instance of Blake2b.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outLen` | `number` | Output length between 1 and 64 bytes. |
| `key?` | `Uint8Array` | Optional key. |

#### Returns

[`Blake2b`](Blake2b.md)

## Properties

### SIZE\_160

▪ `Static` **SIZE\_160**: `number` = `20`

Blake2b 160.

___

### SIZE\_256

▪ `Static` **SIZE\_256**: `number` = `32`

Blake2b 256.

___

### SIZE\_512

▪ `Static` **SIZE\_512**: `number` = `64`

Blake2b 512.

## Methods

### final

▸ **final**(): `Uint8Array`

Completes a BLAKE2b streaming hash.

#### Returns

`Uint8Array`

The final data.

___

### init

▸ **init**(`outputLength`, `key?`): `void`

Creates a BLAKE2b hashing context.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputLength` | `number` | Output length between 1 and 64 bytes. |
| `key?` | `Uint8Array` | Optional key. |

#### Returns

`void`

**`Throws`**

Error if the output length is not between 1 and 64 bytes.

___

### update

▸ **update**(`input`): `void`

Updates a BLAKE2b streaming hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Uint8Array` | The data to hash. |

#### Returns

`void`

___

### sum160

▸ **sum160**(`data`, `key?`): `Uint8Array`

Perform Sum 160 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |
| `key?` | `Uint8Array` | Optional key for the hash. |

#### Returns

`Uint8Array`

The sum 160 of the data.

___

### sum256

▸ **sum256**(`data`, `key?`): `Uint8Array`

Perform Sum 256 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |
| `key?` | `Uint8Array` | Optional key for the hash. |

#### Returns

`Uint8Array`

The sum 256 of the data.

___

### sum512

▸ **sum512**(`data`, `key?`): `Uint8Array`

Perform Sum 512 on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to operate on. |
| `key?` | `Uint8Array` | Optional key for the hash. |

#### Returns

`Uint8Array`

The sum 512 of the data.
