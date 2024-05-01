# Class: Jwt

Class to encode and decode JSON Web Tokens.

## Constructors

### constructor

• **new Jwt**(): [`Jwt`](Jwt.md)

#### Returns

[`Jwt`](Jwt.md)

## Methods

### decode

▸ **decode**\<`U`, `T`\>(`token`): `Promise`\<\{ `header?`: `U` ; `payload?`: `T` ; `signature?`: `Uint8Array`  }\>

Decode a token.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends [`IJwtHeader`](../interfaces/IJwtHeader.md) |
| `T` | extends [`IJwtPayload`](../interfaces/IJwtPayload.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The token to decode. |

#### Returns

`Promise`\<\{ `header?`: `U` ; `payload?`: `T` ; `signature?`: `Uint8Array`  }\>

The decoded payload.

___

### defaultSigner

▸ **defaultSigner**(`alg`, `key`, `payload`): `Promise`\<`Uint8Array`\>

The default signer for the JWT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alg` | [`JwtAlgorithms`](../modules.md#jwtalgorithms) | The algorithm to use. |
| `key` | `Uint8Array` | The key to sign with. |
| `payload` | `Uint8Array` | The payload to sign. |

#### Returns

`Promise`\<`Uint8Array`\>

The signature.

___

### defaultVerifier

▸ **defaultVerifier**(`alg`, `key`, `payload`, `signature`): `Promise`\<`boolean`\>

The default verifier for the JWT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alg` | [`JwtAlgorithms`](../modules.md#jwtalgorithms) | The algorithm to use. |
| `key` | `Uint8Array` | The key to verify with. |
| `payload` | `Uint8Array` | The payload to verify. |
| `signature` | `Uint8Array` | The signature to verify. |

#### Returns

`Promise`\<`boolean`\>

True if the signature was verified.

___

### encode

▸ **encode**\<`U`, `T`\>(`header`, `payload`, `key?`, `signer?`): `Promise`\<`string`\>

Encode a token.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends [`IJwtHeader`](../interfaces/IJwtHeader.md) |
| `T` | extends [`IJwtPayload`](../interfaces/IJwtPayload.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | `U` | The header to encode. |
| `payload` | `T` | The payload to encode. |
| `key?` | `Uint8Array` | The key for signing the token, can be omitted if a signer is provided. |
| `signer?` | (`alg`: [`JwtAlgorithms`](../modules.md#jwtalgorithms), `key`: `undefined` \| `Uint8Array`, `payload`: `Uint8Array`) => `Promise`\<`Uint8Array`\> | Custom signer method. |

#### Returns

`Promise`\<`string`\>

The encoded token.

___

### verify

▸ **verify**\<`U`, `T`\>(`token`, `key`, `verifier?`): `Promise`\<\{ `header?`: `U` ; `payload?`: `T` ; `signature?`: `Uint8Array` ; `verified`: `boolean`  }\>

Verify a token.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends [`IJwtHeader`](../interfaces/IJwtHeader.md) |
| `T` | extends [`IJwtPayload`](../interfaces/IJwtPayload.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The token to verify. |
| `key` | `undefined` \| `Uint8Array` | The key for verifying the token |
| `verifier?` | (`alg`: [`JwtAlgorithms`](../modules.md#jwtalgorithms), `key`: `undefined` \| `Uint8Array`, `payload`: `Uint8Array`, `signature`: `Uint8Array`) => `Promise`\<`boolean`\> | Custom verification method. |

#### Returns

`Promise`\<\{ `header?`: `U` ; `payload?`: `T` ; `signature?`: `Uint8Array` ; `verified`: `boolean`  }\>

The decoded payload.

___

### verifySignature

▸ **verifySignature**\<`U`, `T`\>(`header?`, `payload?`, `signature?`, `key?`, `verifier?`): `Promise`\<`boolean`\>

Verify a token by parts.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends [`IJwtHeader`](../interfaces/IJwtHeader.md) |
| `T` | extends [`IJwtPayload`](../interfaces/IJwtPayload.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header?` | `U` | The header to verify. |
| `payload?` | `T` | The payload to verify. |
| `signature?` | `Uint8Array` | The signature to verify. |
| `key?` | `Uint8Array` | The key for verifying the token, if not provided no verification occurs. |
| `verifier?` | (`alg`: [`JwtAlgorithms`](../modules.md#jwtalgorithms), `key`: `undefined` \| `Uint8Array`, `payload`: `Uint8Array`, `signature`: `Uint8Array`) => `Promise`\<`boolean`\> | Custom verification method. |

#### Returns

`Promise`\<`boolean`\>

True if the parts are verified.
