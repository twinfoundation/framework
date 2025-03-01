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
