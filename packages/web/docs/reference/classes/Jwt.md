# Class: Jwt

Class to encode and decode JavaScript Web Tokens.

## Constructors

### constructor

• **new Jwt**(): [`Jwt`](Jwt.md)

#### Returns

[`Jwt`](Jwt.md)

## Methods

### decode

▸ **decode**\<`U`, `T`\>(`token`, `key`): `undefined` \| \{ `header`: `U` ; `payload`: `T`  }

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
| `key` | `Uint8Array` | The key for verifying the token. |

#### Returns

`undefined` \| \{ `header`: `U` ; `payload`: `T`  }

The decoded payload.

___

### encode

▸ **encode**\<`U`, `T`\>(`header`, `payload`, `key`): `string`

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
| `key` | `Uint8Array` | The key for signing the token. |

#### Returns

`string`

The encoded token.

___

### verify

▸ **verify**(`token`, `key`): `undefined` \| \{ `header`: `Uint8Array` ; `payload`: `Uint8Array`  }

Verify a token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | The token to decode. |
| `key` | `Uint8Array` | The key for verifying the token. |

#### Returns

`undefined` \| \{ `header`: `Uint8Array` ; `payload`: `Uint8Array`  }

The base64 payload or undefined if the verify failed.
