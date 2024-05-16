[**@gtsc/crypto**](../README.md) • **Docs**

***

# Class: ChaCha20

Implementation of the ChaCha20 cipher.

## Constructors

### new ChaCha20()

> **new ChaCha20**(`key`, `nonce`, `counter`): [`ChaCha20`](ChaCha20.md)

Create a new instance of ChaCha20.

#### Parameters

• **key**: `Uint8Array`

The key.

• **nonce**: `Uint8Array`

The nonce.

• **counter**: `number`= `0`

Counter.

#### Returns

[`ChaCha20`](ChaCha20.md)

## Methods

### decrypt()

> **decrypt**(`data`): `Uint8Array`

Decrypt the data.

#### Parameters

• **data**: `Uint8Array`

The source data to decrypt.

#### Returns

`Uint8Array`

The decrypted data.

***

### encrypt()

> **encrypt**(`data`): `Uint8Array`

Encrypt the data.

#### Parameters

• **data**: `Uint8Array`

The source data to encrypt.

#### Returns

`Uint8Array`

The encrypted data.

***

### keyStream()

> **keyStream**(`length`): `Uint8Array`

Create a keystream of the given length.

#### Parameters

• **length**: `number`

The length to create the keystream.

#### Returns

`Uint8Array`

The keystream.
