# Class: Pbkdf2

Implementation of the password based key derivation function 2.

## Constructors

### constructor

• **new Pbkdf2**(): [`Pbkdf2`](Pbkdf2.md)

#### Returns

[`Pbkdf2`](Pbkdf2.md)

## Methods

### sha256

▸ **sha256**(`password`, `salt`, `iterations`, `keyLength`): `Uint8Array`

Derive a key from the parameters using Sha256.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `Uint8Array` | The password to derive the key from. |
| `salt` | `Uint8Array` | The salt for the derivation. |
| `iterations` | `number` | Number of iterations to perform. |
| `keyLength` | `number` | The length of the key to derive. |

#### Returns

`Uint8Array`

The derived key.

___

### sha512

▸ **sha512**(`password`, `salt`, `iterations`, `keyLength`): `Uint8Array`

Derive a key from the parameters using Sha512.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `Uint8Array` | The password to derive the key from. |
| `salt` | `Uint8Array` | The salt for the derivation. |
| `iterations` | `number` | Number of iterations to perform. |
| `keyLength` | `number` | The length of the key to derive. |

#### Returns

`Uint8Array`

The derived key.
