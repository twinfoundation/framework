# Class: Converter

Convert arrays to and from different formats.

## Constructors

### constructor

• **new Converter**(): [`Converter`](Converter.md)

#### Returns

[`Converter`](Converter.md)

## Methods

### base64ToBytes

▸ **base64ToBytes**(`base64`): `Uint8Array`

Convert a base64 string to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64` | `string` | The base64 string. |

#### Returns

`Uint8Array`

The bytes.

___

### base64UrlToBytes

▸ **base64UrlToBytes**(`base64Url`): `Uint8Array`

Convert a base64 url string to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64Url` | `string` | The base64 url string. |

#### Returns

`Uint8Array`

The bytes.

___

### binaryToBytes

▸ **binaryToBytes**(`binary`): `Uint8Array`

Convert a binary string to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `binary` | `string` | The binary string. |

#### Returns

`Uint8Array`

The bytes.

___

### bytesToBase64

▸ **bytesToBase64**(`bytes`): `string`

Convert bytes to base64 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The bytes to convert. |

#### Returns

`string`

A base64 string of the bytes.

___

### bytesToBase64Url

▸ **bytesToBase64Url**(`bytes`): `string`

Convert bytes to base64 url string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The bytes to convert. |

#### Returns

`string`

A base64 url string of the bytes.

___

### bytesToBinary

▸ **bytesToBinary**(`bytes`): `string`

Convert bytes to binary string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The bytes to convert. |

#### Returns

`string`

A binary string of the bytes.

___

### bytesToHex

▸ **bytesToHex**(`array`, `includePrefix?`, `startIndex?`, `length?`, `reverse?`): `string`

Encode a raw array to hex string.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `array` | `ArrayLike`\<`number`\> | `undefined` | The bytes to encode. |
| `includePrefix` | `boolean` | `false` | Include the 0x prefix on the returned hex. |
| `startIndex?` | `number` | `undefined` | The index to start in the bytes. |
| `length?` | `number` | `undefined` | The length of bytes to read. |
| `reverse?` | `boolean` | `undefined` | Reverse the combine direction. |

#### Returns

`string`

The array formatted as hex.

___

### bytesToUtf8

▸ **bytesToUtf8**(`array`, `startIndex?`, `length?`): `string`

Encode a raw array to UTF8 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `ArrayLike`\<`number`\> | The bytes to encode. |
| `startIndex?` | `number` | The index to start in the bytes. |
| `length?` | `number` | The length of bytes to read. |

#### Returns

`string`

The array formatted as UTF8.

___

### hexToBytes

▸ **hexToBytes**(`hex`, `reverse?`): `Uint8Array`

Decode a hex string to raw array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex to decode. |
| `reverse?` | `boolean` | Store the characters in reverse. |

#### Returns

`Uint8Array`

The array.

___

### hexToUtf8

▸ **hexToUtf8**(`hex`): `string`

Convert the hex text to text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex to convert. |

#### Returns

`string`

The UTF8 version of the bytes.

___

### utf8ToBytes

▸ **utf8ToBytes**(`utf8`): `Uint8Array`

Convert a UTF8 string to raw array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `utf8` | `string` | The text to decode. |

#### Returns

`Uint8Array`

The array.

___

### utf8ToHex

▸ **utf8ToHex**(`utf8`, `includePrefix?`): `string`

Convert the UTF8 to hex.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `utf8` | `string` | `undefined` | The text to convert. |
| `includePrefix` | `boolean` | `false` | Include the 0x prefix on the returned hex. |

#### Returns

`string`

The hex version of the bytes.
