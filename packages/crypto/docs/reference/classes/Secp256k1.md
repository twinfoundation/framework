# Class: Secp256k1

Implementation of secp256k1.

## Constructors

### new Secp256k1()

> **new Secp256k1**(): [`Secp256k1`](Secp256k1.md)

#### Returns

[`Secp256k1`](Secp256k1.md)

## Properties

### PRIVATE\_KEY\_SIZE

> `static` **PRIVATE\_KEY\_SIZE**: `number` = `32`

Private Key Size is the size, in bytes, of private keys as used in this package.

***

### PUBLIC\_KEY\_SIZE

> `static` **PUBLIC\_KEY\_SIZE**: `number` = `33`

Public Key Size is the size, in bytes, of public keys as used in this package.

## Methods

### publicKeyFromPrivateKey()

> `static` **publicKeyFromPrivateKey**(`privateKey`): `Uint8Array`

Public returns the PublicKey corresponding to private.

#### Parameters

• **privateKey**: `Uint8Array`

The private key to get the corresponding public key.

#### Returns

`Uint8Array`

The public key.

#### Throws

Error if the private key is not the correct length.

***

### sign()

> `static` **sign**(`privateKey`, `block`): `Uint8Array`

Sign the block with privateKey and returns a signature.

#### Parameters

• **privateKey**: `Uint8Array`

The private key.

• **block**: `Uint8Array`

The block to sign.

#### Returns

`Uint8Array`

The signature.

#### Throws

Error if the private key is not the correct length.

***

### verify()

> `static` **verify**(`publicKey`, `block`, `signature`): `boolean`

Verify reports whether sig is a valid signature of block by publicKey.

#### Parameters

• **publicKey**: `Uint8Array`

The public key to verify the signature.

• **block**: `Uint8Array`

The block for the signature.

• **signature**: `Uint8Array`

The signature.

#### Returns

`boolean`

True if the signature matches.

#### Throws

Error if the public key is not the correct length.
