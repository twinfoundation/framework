# Class: Jwk

Class to handle JSON Web Keys.

## Constructors

### new Jwk()

> **new Jwk**(): [`Jwk`](Jwk.md)

#### Returns

[`Jwk`](Jwk.md)

## Methods

### toCryptoKey()

> `static` **toCryptoKey**(`jwk`): `Promise`\<[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)\>

Convert the JWK to a crypto key.

#### Parameters

##### jwk

[`IJwk`](../interfaces/IJwk.md)

The JWK to convert.

#### Returns

`Promise`\<[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)\>

The crypto key.

***

### fromEd25519Private()

> `static` **fromEd25519Private**(`privateKey`): `Promise`\<[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)\>

Convert the Ed25519 private key to a crypto key.

#### Parameters

##### privateKey

`Uint8Array`

The private key to use.

#### Returns

`Promise`\<[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)\>

The crypto key.

***

### fromEd25519Public()

> `static` **fromEd25519Public**(`publicKey`): `Promise`\<[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)\>

Convert the Ed25519 public key to a crypto key.

#### Parameters

##### publicKey

`Uint8Array`

The private key to use.

#### Returns

`Promise`\<[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)\>

The crypto key.
