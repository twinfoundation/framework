# Class: Jwt

Class to encode and decode JSON Web Tokens.

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

`Uint8Array`

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

(`alg`, `key`, `payload`) => `Promise`\<`Uint8Array`\>

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

> `static` **verify**\<`U`, `T`\>(`token`, `key`): `Promise`\<\{ `verified`: `boolean`; `header`: `U`; `payload`: `T`; `signature`: `Uint8Array`; \}\>

Verify a token.

#### Type Parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to verify.

##### key

`Uint8Array`

The key for verifying the token

#### Returns

`Promise`\<\{ `verified`: `boolean`; `header`: `U`; `payload`: `T`; `signature`: `Uint8Array`; \}\>

The decoded payload.

***

### verifyWithVerifier()

> `static` **verifyWithVerifier**\<`U`, `T`\>(`token`, `verifier`): `Promise`\<\{ `verified`: `boolean`; `header`: `U`; `payload`: `T`; `signature`: `Uint8Array`; \}\>

Verify a token.

#### Type Parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### token

`string`

The token to verify.

##### verifier

(`alg`, `key`, `payload`, `signature`) => `Promise`\<`boolean`\>

Custom verification method.

#### Returns

`Promise`\<\{ `verified`: `boolean`; `header`: `U`; `payload`: `T`; `signature`: `Uint8Array`; \}\>

The decoded payload.

***

### verifySignature()

> `static` **verifySignature**\<`U`, `T`\>(`header`?, `payload`?, `signature`?, `key`?, `verifier`?): `Promise`\<`boolean`\>

Verify a token by parts.

#### Type Parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

##### header?

`U`

The header to verify.

##### payload?

`T`

The payload to verify.

##### signature?

`Uint8Array`

The signature to verify.

##### key?

`Uint8Array`

The key for verifying the token, if not provided no verification occurs.

##### verifier?

(`alg`, `key`, `payload`, `signature`) => `Promise`\<`boolean`\>

Custom verification method.

#### Returns

`Promise`\<`boolean`\>

True if the parts are verified.

***

### defaultSigner()

> `static` **defaultSigner**(`alg`, `key`, `payload`): `Promise`\<`Uint8Array`\>

The default signer for the JWT.

#### Parameters

##### alg

[`JwtAlgorithms`](../type-aliases/JwtAlgorithms.md)

The algorithm to use.

##### key

The key to sign with.

`undefined` | `Uint8Array`

##### payload

`Uint8Array`

The payload to sign.

#### Returns

`Promise`\<`Uint8Array`\>

The signature.

***

### defaultVerifier()

> `static` **defaultVerifier**(`alg`, `key`, `payload`, `signature`): `Promise`\<`boolean`\>

The default verifier for the JWT.

#### Parameters

##### alg

[`JwtAlgorithms`](../type-aliases/JwtAlgorithms.md)

The algorithm to use.

##### key

The key to verify with.

`undefined` | `Uint8Array`

##### payload

`Uint8Array`

The payload to verify.

##### signature

`Uint8Array`

The signature to verify.

#### Returns

`Promise`\<`boolean`\>

True if the signature was verified.
