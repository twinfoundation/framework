# Class: Jws

Class to handle JSON Web Signatures.

## Constructors

### new Jws()

> **new Jws**(): [`Jws`](Jws.md)

#### Returns

[`Jws`](Jws.md)

## Methods

### create()

> `static` **create**(`privateKey`, `hash`, `algOverride`?): `Promise`\<`string`\>

Create a signature.

#### Parameters

##### privateKey

[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

The private key to use.

##### hash

`Uint8Array`

The hash to sign.

##### algOverride?

`string`

An optional algorithm override.

#### Returns

`Promise`\<`string`\>

The signature.

***

### verify()

> `static` **verify**(`jws`, `publicKey`, `hash`): `Promise`\<`boolean`\>

Verify a signature.

#### Parameters

##### jws

`string`

The signature to verify.

##### publicKey

[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

The public key to verify the signature with.

##### hash

`Uint8Array`

The hash to verify.

#### Returns

`Promise`\<`boolean`\>

True if the signature was verified.
