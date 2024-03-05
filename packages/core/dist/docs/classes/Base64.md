# Class: Base64

Class to help with base64 Encoding/Decoding.
Sourced from https://github.com/beatgammit/base64-js.

## Constructors

### constructor

• **new Base64**(): [`Base64`](Base64.md)

#### Returns

[`Base64`](Base64.md)

## Methods

### decode

▸ **decode**(`base64`): `Uint8Array`

Convert the base 64 string to a byte array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64` | `string` | The base64 string to convert. |

#### Returns

`Uint8Array`

The byte array.

___

### encode

▸ **encode**(`bytes`): `string`

Convert a byte array to base 64.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The byte array to convert. |

#### Returns

`string`

The data as bas64 string.
