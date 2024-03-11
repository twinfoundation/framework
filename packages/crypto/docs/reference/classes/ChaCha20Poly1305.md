# Class: ChaCha20Poly1305

Implementation of the ChaCha20Poly1305 cipher.

## Methods

### final

▸ **final**(): `void`

Finalise the data.

#### Returns

`void`

**`Throws`**

GeneralError if the auth tag is not set when decrypting.

**`Throws`**

GeneralError if the authentication fails.

___

### getAuthTag

▸ **getAuthTag**(): `Uint8Array`

Get the auth tag.

#### Returns

`Uint8Array`

The auth tag.

**`Throws`**

GeneralError if trying to get the auth tag while decrypting.

**`Throws`**

GeneralError if the auth tag is not set.

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

**`Throws`**

GeneralError if the aad is set after data.

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

**`Throws`**

GeneralError if trying to set the auth tag while encrypting.

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
