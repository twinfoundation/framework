# Class: Base64Url

Class to help with base64 URL Encoding/Decoding.
https://www.rfc-editor.org/rfc/rfc4648#section-5.

## Constructors

### constructor

• **new Base64Url**(): [`Base64Url`](Base64Url.md)

#### Returns

[`Base64Url`](Base64Url.md)

## Methods

### decode

▸ **decode**(`base64Url`): `Uint8Array`

Convert the base 64 string to a byte array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64Url` | `string` | The base64 url string to convert. |

#### Returns

`Uint8Array`

The byte array.

___

### encode

▸ **encode**(`bytes`): `string`

Convert a byte array to base 64 url.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The byte array to convert. |

#### Returns

`string`

The data as base64 url string.
