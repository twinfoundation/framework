# Class: HmacSha1

Class to help with HmacSha1 scheme.
TypeScript conversion from https://github.com/emn178/js-sha1.

## Constructors

### constructor

• **new HmacSha1**(`key`): [`HmacSha1`](HmacSha1.md)

Create a new instance of HmacSha1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key for the hmac. |

#### Returns

[`HmacSha1`](HmacSha1.md)

## Methods

### digest

▸ **digest**(): `Uint8Array`

Get the digest.

#### Returns

`Uint8Array`

The digest.

___

### update

▸ **update**(`message`): [`HmacSha1`](HmacSha1.md)

Update the hash with the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The data to update the hash with. |

#### Returns

[`HmacSha1`](HmacSha1.md)

The instance for chaining.

___

### sum

▸ **sum**(`key`, `data`): `Uint8Array`

Perform Sum on the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key for the hmac. |
| `data` | `Uint8Array` | The data to operate on. |

#### Returns

`Uint8Array`

The sum of the data.
