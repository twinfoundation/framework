# Class: ChaCha20Poly1305

Implementation of the ChaCha20Poly1305 cipher.

## Constructors

### Constructor

> **new ChaCha20Poly1305**(`key`, `nonce`, `aad?`): `ChaCha20Poly1305`

Create a new instance of ChaCha20Poly1305.

#### Parameters

##### key

`Uint8Array`

The key.

##### nonce

`Uint8Array`

The nonce.

##### aad?

`Uint8Array`\<`ArrayBufferLike`\>

The additional authenticated data.

#### Returns

`ChaCha20Poly1305`

## Methods

### encrypt()

> **encrypt**(`block`): `Uint8Array`

Encrypt the block.

#### Parameters

##### block

`Uint8Array`

The block to encrypt.

#### Returns

`Uint8Array`

The block encrypted.

***

### decrypt()

> **decrypt**(`block`): `Uint8Array`

Decrypt the block.

#### Parameters

##### block

`Uint8Array`

The block to decrypt.

#### Returns

`Uint8Array`

The block decrypted.
