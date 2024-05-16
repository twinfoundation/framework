[**@gtsc/web**](../README.md) • **Docs**

***

# Class: Jwt

Class to encode and decode JSON Web Tokens.

## Constructors

### new Jwt()

> **new Jwt**(): [`Jwt`](Jwt.md)

#### Returns

[`Jwt`](Jwt.md)

## Methods

### decode()

> `static` **decode**\<`U`, `T`\>(`token`): `Promise`\<`object`\>

Decode a token.

#### Type parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

• **token**: `string`

The token to decode.

#### Returns

`Promise`\<`object`\>

The decoded payload.

##### header?

> `optional` **header**: `U`

##### payload?

> `optional` **payload**: `T`

##### signature?

> `optional` **signature**: `Uint8Array`

***

### defaultSigner()

> `static` **defaultSigner**(`alg`, `key`, `payload`): `Promise`\<`Uint8Array`\>

The default signer for the JWT.

#### Parameters

• **alg**: [`JwtAlgorithms`](../type-aliases/JwtAlgorithms.md)

The algorithm to use.

• **key**: `Uint8Array`

The key to sign with.

• **payload**: `Uint8Array`

The payload to sign.

#### Returns

`Promise`\<`Uint8Array`\>

The signature.

***

### defaultVerifier()

> `static` **defaultVerifier**(`alg`, `key`, `payload`, `signature`): `Promise`\<`boolean`\>

The default verifier for the JWT.

#### Parameters

• **alg**: [`JwtAlgorithms`](../type-aliases/JwtAlgorithms.md)

The algorithm to use.

• **key**: `Uint8Array`

The key to verify with.

• **payload**: `Uint8Array`

The payload to verify.

• **signature**: `Uint8Array`

The signature to verify.

#### Returns

`Promise`\<`boolean`\>

True if the signature was verified.

***

### encode()

> `static` **encode**\<`U`, `T`\>(`header`, `payload`, `key`?, `signer`?): `Promise`\<`string`\>

Encode a token.

#### Type parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

• **header**: `U`

The header to encode.

• **payload**: `T`

The payload to encode.

• **key?**: `Uint8Array`

The key for signing the token, can be omitted if a signer is provided.

• **signer?**

Custom signer method.

#### Returns

`Promise`\<`string`\>

The encoded token.

***

### verify()

> `static` **verify**\<`U`, `T`\>(`token`, `key`, `verifier`?): `Promise`\<`object`\>

Verify a token.

#### Type parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

• **token**: `string`

The token to verify.

• **key**: `undefined` \| `Uint8Array`

The key for verifying the token

• **verifier?**

Custom verification method.

#### Returns

`Promise`\<`object`\>

The decoded payload.

##### header?

> `optional` **header**: `U`

##### payload?

> `optional` **payload**: `T`

##### signature?

> `optional` **signature**: `Uint8Array`

##### verified

> **verified**: `boolean`

***

### verifySignature()

> `static` **verifySignature**\<`U`, `T`\>(`header`?, `payload`?, `signature`?, `key`?, `verifier`?): `Promise`\<`boolean`\>

Verify a token by parts.

#### Type parameters

• **U** *extends* [`IJwtHeader`](../interfaces/IJwtHeader.md)

• **T** *extends* [`IJwtPayload`](../interfaces/IJwtPayload.md)

#### Parameters

• **header?**: `U`

The header to verify.

• **payload?**: `T`

The payload to verify.

• **signature?**: `Uint8Array`

The signature to verify.

• **key?**: `Uint8Array`

The key for verifying the token, if not provided no verification occurs.

• **verifier?**

Custom verification method.

#### Returns

`Promise`\<`boolean`\>

True if the parts are verified.
