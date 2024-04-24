# Class: Jwt

Class to encode and decode JavaScript Web Tokens.

## Constructors

### constructor

• **new Jwt**(): [`Jwt`](Jwt.md)

#### Returns

[`Jwt`](Jwt.md)

## Methods

### decode

▸ **decode**\<`U`, `T`\>(`token`): `Object`

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

`Object`

The decoded payload.

| Name | Type |
| :------ | :------ |
| `header?` | `U` |
| `payload?` | `T` |
| `signature?` | `Uint8Array` |

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

▸ **verify**\<`U`, `T`\>(`token`, `key`): `Object`

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
| `key` | `Uint8Array` | The key for verifying the token, if not provided no verification occurs. |

#### Returns

`Object`

The decoded payload.

| Name | Type |
| :------ | :------ |
| `header?` | `U` |
| `payload?` | `T` |
| `signature?` | `Uint8Array` |
| `verified` | `boolean` |

___

### verifySignature

▸ **verifySignature**\<`U`, `T`\>(`header?`, `payload?`, `signature?`, `key?`): `boolean`

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

#### Returns

`boolean`

True if the parts are verified.
