# Class: Jwt

Class to handle JSON Web Tokens.

## Constructors

### new Jwt()

> **new Jwt**(): [`Jwt`](Jwt.md)

#### Returns

[`Jwt`](Jwt.md)

## Methods

### encode()

> `static` **encode**\<`U`, `T`\>(`header`, `payload`, `key`): `Promise`\<`string`\>

Encode a token.

#### Type Parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### header

`U`

The header to encode.

##### payload

`T`

The payload to encode.

##### key

[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

The key for signing the token, can be omitted if a signer is provided.

#### Returns

`Promise`\<`string`\>

The encoded token.

***

### encodeWithSigner()

> `static` **encodeWithSigner**\<`U`, `T`\>(`header`, `payload`, `signer`): `Promise`\<`string`\>

Encode a token.

#### Type Parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### header

`U`

The header to encode.

##### payload

`T`

The payload to encode.

##### signer

(`alg`, `key`, `header`, `payload`) => `Promise`\<`string`\>

Custom signer method.

#### Returns

`Promise`\<`string`\>

The encoded token.

***

### decode()

> `static` **decode**\<`U`, `T`\>(`token`): `Promise`\<\{ `header`: `U`; `payload`: `T`; `signature`: `Uint8Array`; \}\>

Decode a token.

#### Type Parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to decode.

#### Returns

`Promise`\<\{ `header`: `U`; `payload`: `T`; `signature`: `Uint8Array`; \}\>

The decoded payload.

***

### verify()

> `static` **verify**\<`T`, `U`\>(`token`, `key`): `Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

Verify a token.

#### Type Parameters

• **T** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **U** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to verify.

##### key

[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

The key for verifying the token

#### Returns

`Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

The decoded payload.

***

### verifyWithVerifier()

> `static` **verifyWithVerifier**\<`T`, `U`\>(`token`, `verifier`): `Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

Verify a token.

#### Type Parameters

• **T** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **U** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to verify.

##### verifier

(`token`, `key`) => `Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

Custom verification method.

#### Returns

`Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

The decoded payload.

***

### verifySignature()

> `static` **verifySignature**\<`T`, `U`\>(`token`, `key`?, `verifier`?): `Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

Verify a token by parts.

#### Type Parameters

• **T** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **U** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to verify.

##### key?

[`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

The key for verifying the token, if not provided no verification occurs.

##### verifier?

(`token`, `key`) => `Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

Custom verification method.

#### Returns

`Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

True if the parts are verified.

***

### defaultSigner()

> `static` **defaultSigner**(`alg`, `key`, `header`, `payload`): `Promise`\<`string`\>

The default signer for the JWT.

#### Parameters

##### alg

`string`

The algorithm to use.

##### key

The key to sign with.

`undefined` | [`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

##### header

[`IJwtHeader`](../interfaces/IJwtHeader.md)

The header to sign.

##### payload

[`IJwtPayload`](../interfaces/IJwtPayload.md)

The payload to sign.

#### Returns

`Promise`\<`string`\>

The signature.

***

### defaultVerifier()

> `static` **defaultVerifier**\<`T`, `U`\>(`token`, `key`): `Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

The default verifier for the JWT.

#### Type Parameters

• **T** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **U** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to verify.

##### key

The key to verify with.

`undefined` | [`JwkCryptoKey`](../type-aliases/JwkCryptoKey.md)

#### Returns

`Promise`\<\{ `header`: `T`; `payload`: `U`; \}\>

True if the signature was verified.
