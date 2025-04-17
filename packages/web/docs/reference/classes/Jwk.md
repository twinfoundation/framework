# Class: Jwk

Class to handle JSON Web Keys.

## Constructors

### Constructor

> **new Jwk**(): `Jwk`

#### Returns

`Jwk`

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

> `static` **fromEd25519Private**(`privateKey`): `Promise`\<[`IJwk`](../interfaces/IJwk.md)\>

Convert the Ed25519 private key to a crypto key.

#### Parameters

##### privateKey

`Uint8Array`

The private key to use.

#### Returns

`Promise`\<[`IJwk`](../interfaces/IJwk.md)\>

The crypto key.

***

### fromEd25519Public()

> `static` **fromEd25519Public**(`publicKey`): `Promise`\<[`IJwk`](../interfaces/IJwk.md)\>

Convert the Ed25519 public key to a crypto key.

#### Parameters

##### publicKey

`Uint8Array`

The private key to use.

#### Returns

`Promise`\<[`IJwk`](../interfaces/IJwk.md)\>

The crypto key.

***

### toRaw()

> `static` **toRaw**(`jwk`): `Promise`\<\{ `publicKey`: `Uint8Array`\<`ArrayBufferLike`\>; `privateKey`: `Uint8Array`\<`ArrayBufferLike`\>; \}\>

Convert the JWK to raw keys.

#### Parameters

##### jwk

[`IJwk`](../interfaces/IJwk.md)

The JWK to convert to raw.

#### Returns

`Promise`\<\{ `publicKey`: `Uint8Array`\<`ArrayBufferLike`\>; `privateKey`: `Uint8Array`\<`ArrayBufferLike`\>; \}\>

The crypto key.
