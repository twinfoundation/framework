# Class: ChaCha20Poly1305

Implementation of the ChaCha20Poly1305 cipher.

## Methods

### final

▸ **final**(): `void`

Finalise the data.

#### Returns

`void`

___

### getAuthTag

▸ **getAuthTag**(): `Uint8Array`

Get the auth tag.

#### Returns

`Uint8Array`

The auth tag.

___

### setAAD

▸ **setAAD**(`aad`): `void`

Set the AAD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aad` | `Uint8Array` | The aad to set. |

#### Returns

`void`

___

### setAuthTag

▸ **setAuthTag**(`authTag`): `void`

Set the auth tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authTag` | `Uint8Array` | Set the auth tag. |

#### Returns

`void`

___

### update

▸ **update**(`input`): `Uint8Array`

Update the cipher with more data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Uint8Array` | The input data to include. |

#### Returns

`Uint8Array`

The updated data.

___

### decryptor

▸ **decryptor**(`key`, `nonce`): [`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Create a ChaCha20Poly1305 decryptor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key. |
| `nonce` | `Uint8Array` | The nonce. |

#### Returns

[`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Decryptor instance of ChaCha20Poly1305.

___

### encryptor

▸ **encryptor**(`key`, `nonce`): [`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Create a ChaCha20Poly1305 encryptor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key. |
| `nonce` | `Uint8Array` | The nonce. |

#### Returns

[`ChaCha20Poly1305`](ChaCha20Poly1305.md)

Encryptor instance of ChaCha20Poly1305.
