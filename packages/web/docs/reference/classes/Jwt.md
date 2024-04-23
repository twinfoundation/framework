# Class: Jwt

Class to encode and decode JavaScript Web Tokens.

## Constructors

### constructor

• **new Jwt**(): [`Jwt`](Jwt.md)

#### Returns

[`Jwt`](Jwt.md)

## Methods

### decode

▸ **decode**\<`T`\>(`token`, `key`): `undefined` \| `T`

Decode a token.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The token to decode. |
| `key` | `Uint8Array` | The key for verifying the token. |

#### Returns

`undefined` \| `T`

The decoded payload.

___

### encode

▸ **encode**\<`T`\>(`payload`, `key`, `algorithm?`): `string`

Encode a token.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `payload` | `T` | `undefined` | The payload to encode. |
| `key` | `Uint8Array` | `undefined` | The key for signing the token. |
| `algorithm` | [`JwtSigningMethods`](../modules.md#jwtsigningmethods) | `"EdDSA"` | The algorithm to create the signature with. |

#### Returns

`string`

The encoded token.

___

### verify

▸ **verify**(`token`, `key`): `undefined` \| `Uint8Array`

Verify a token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The token to decode. |
| `key` | `Uint8Array` | The key for verifying the token. |

#### Returns

`undefined` \| `Uint8Array`

The base64 payload or undefined if the verify failed.
