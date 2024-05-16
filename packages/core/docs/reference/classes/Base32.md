[**@gtsc/core**](../README.md) • **Docs**

***

# Class: Base32

Class to help with base63 Encoding/Decoding.

## Constructors

### new Base32()

> **new Base32**(): [`Base32`](Base32.md)

#### Returns

[`Base32`](Base32.md)

## Methods

### decode()

> `static` **decode**(`base32`): `Uint8Array`

Convert the base 32 string to a byte array.

#### Parameters

• **base32**: `string`

The base32 string to convert.

#### Returns

`Uint8Array`

The byte array.

#### Throws

If the input string contains a character not in the Base32 alphabet.

***

### encode()

> `static` **encode**(`bytes`): `string`

Convert a byte array to base 32.

#### Parameters

• **bytes**: `Uint8Array`

The byte array to convert.

#### Returns

`string`

The data as base32 string.
