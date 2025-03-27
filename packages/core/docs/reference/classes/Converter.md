# Class: Converter

Convert arrays to and from different formats.

## Constructors

### new Converter()

> **new Converter**(): [`Converter`](Converter.md)

#### Returns

[`Converter`](Converter.md)

## Methods

### bytesToUtf8()

> `static` **bytesToUtf8**(`array`, `startIndex`?, `length`?): `string`

Encode a raw array to UTF8 string.

#### Parameters

##### array

`ArrayLike`\<`number`\>

The bytes to encode.

##### startIndex?

`number`

The index to start in the bytes.

##### length?

`number`

The length of bytes to read.

#### Returns

`string`

The array formatted as UTF8.

***

### utf8ToBytes()

> `static` **utf8ToBytes**(`utf8`): `Uint8Array`

Convert a UTF8 string to raw array.

#### Parameters

##### utf8

`string`

The text to decode.

#### Returns

`Uint8Array`

The array.

***

### bytesToHex()

> `static` **bytesToHex**(`array`, `includePrefix`, `startIndex`?, `length`?, `reverse`?): `string`

Encode a raw array to hex string.

#### Parameters

##### array

`ArrayLike`\<`number`\>

The bytes to encode.

##### includePrefix

`boolean` = `false`

Include the 0x prefix on the returned hex.

##### startIndex?

`number`

The index to start in the bytes.

##### length?

`number`

The length of bytes to read.

##### reverse?

`boolean`

Reverse the combine direction.

#### Returns

`string`

The array formatted as hex.

***

### hexToBytes()

> `static` **hexToBytes**(`hex`, `reverse`?): `Uint8Array`

Decode a hex string to raw array.

#### Parameters

##### hex

`string`

The hex to decode.

##### reverse?

`boolean`

Store the characters in reverse.

#### Returns

`Uint8Array`

The array.

***

### utf8ToHex()

> `static` **utf8ToHex**(`utf8`, `includePrefix`): `string`

Convert the UTF8 to hex.

#### Parameters

##### utf8

`string`

The text to convert.

##### includePrefix

`boolean` = `false`

Include the 0x prefix on the returned hex.

#### Returns

`string`

The hex version of the bytes.

***

### hexToUtf8()

> `static` **hexToUtf8**(`hex`): `string`

Convert the hex text to text.

#### Parameters

##### hex

`string`

The hex to convert.

#### Returns

`string`

The UTF8 version of the bytes.

***

### bytesToBinary()

> `static` **bytesToBinary**(`bytes`): `string`

Convert bytes to binary string.

#### Parameters

##### bytes

`Uint8Array`

The bytes to convert.

#### Returns

`string`

A binary string of the bytes.

***

### binaryToBytes()

> `static` **binaryToBytes**(`binary`): `Uint8Array`

Convert a binary string to bytes.

#### Parameters

##### binary

`string`

The binary string.

#### Returns

`Uint8Array`

The bytes.

***

### bytesToBase64()

> `static` **bytesToBase64**(`bytes`): `string`

Convert bytes to base64 string.

#### Parameters

##### bytes

`Uint8Array`

The bytes to convert.

#### Returns

`string`

A base64 string of the bytes.

***

### base64ToBytes()

> `static` **base64ToBytes**(`base64`): `Uint8Array`

Convert a base64 string to bytes.

#### Parameters

##### base64

`string`

The base64 string.

#### Returns

`Uint8Array`

The bytes.

***

### bytesToBase64Url()

> `static` **bytesToBase64Url**(`bytes`): `string`

Convert bytes to base64 url string.

#### Parameters

##### bytes

`Uint8Array`

The bytes to convert.

#### Returns

`string`

A base64 url string of the bytes.

***

### base64UrlToBytes()

> `static` **base64UrlToBytes**(`base64Url`): `Uint8Array`

Convert a base64 url string to bytes.

#### Parameters

##### base64Url

`string`

The base64 url string.

#### Returns

`Uint8Array`

The bytes.

***

### bytesToBase58()

> `static` **bytesToBase58**(`bytes`): `string`

Convert bytes to base58 string.

#### Parameters

##### bytes

`Uint8Array`

The bytes to convert.

#### Returns

`string`

A base58 string of the bytes.

***

### base58ToBytes()

> `static` **base58ToBytes**(`base58`): `Uint8Array`

Convert a base58 string to bytes.

#### Parameters

##### base58

`string`

The base58 string.

#### Returns

`Uint8Array`

The bytes.
