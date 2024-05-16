# Class: Base64Url

Class to help with base64 URL Encoding/Decoding.
https://www.rfc-editor.org/rfc/rfc4648#section-5.

## Constructors

### new Base64Url()

> **new Base64Url**(): [`Base64Url`](Base64Url.md)

#### Returns

[`Base64Url`](Base64Url.md)

## Methods

### decode()

> `static` **decode**(`base64Url`): `Uint8Array`

Convert the base 64 string to a byte array.

#### Parameters

• **base64Url**: `string`

The base64 url string to convert.

#### Returns

`Uint8Array`

The byte array.

***

### encode()

> `static` **encode**(`bytes`): `string`

Convert a byte array to base 64 url.

#### Parameters

• **bytes**: `Uint8Array`

The byte array to convert.

#### Returns

`string`

The data as base64 url string.
