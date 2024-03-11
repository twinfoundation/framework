# Class: Bech32

Bech32 encoding and decoding.

## Constructors

### constructor

• **new Bech32**(): [`Bech32`](Bech32.md)

#### Returns

[`Bech32`](Bech32.md)

## Methods

### decode

▸ **decode**(`bech`): `undefined` \| \{ `data`: `Uint8Array` ; `humanReadablePart`: `string`  }

Decode a bech32 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bech` | `string` | The text to decode. |

#### Returns

`undefined` \| \{ `data`: `Uint8Array` ; `humanReadablePart`: `string`  }

The decoded data or undefined if it could not be decoded.

___

### decodeTo5BitArray

▸ **decodeTo5BitArray**(`bech`): `undefined` \| \{ `data`: `Uint8Array` ; `humanReadablePart`: `string`  }

Decode a bech32 string to 5 bit array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bech` | `string` | The text to decode. |

#### Returns

`undefined` \| \{ `data`: `Uint8Array` ; `humanReadablePart`: `string`  }

The decoded data or undefined if it could not be decoded.

**`Throws`**

GeneralError if the bech32 string is invalid.

___

### encode

▸ **encode**(`humanReadablePart`, `data`): `string`

Encode the buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `humanReadablePart` | `string` | The header. |
| `data` | `Uint8Array` | The data to encode. |

#### Returns

`string`

The encoded data.

___

### encode5BitArray

▸ **encode5BitArray**(`humanReadablePart`, `data5Bit`): `string`

Encode the 5 bit data buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `humanReadablePart` | `string` | The header. |
| `data5Bit` | `Uint8Array` | The data to encode. |

#### Returns

`string`

The encoded data.

___

### from5Bit

▸ **from5Bit**(`fiveBit`): `Uint8Array`

Convert the 5 bit data to 8 bit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fiveBit` | `Uint8Array` | The 5 bit data to convert. |

#### Returns

`Uint8Array`

The 5 bit data converted to 8 bit.

___

### matches

▸ **matches**(`humanReadablePart`, `bech32Text?`): `boolean`

Does the given string match the bech32 pattern.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `humanReadablePart` | `string` | The human readable part. |
| `bech32Text?` | `string` | The text to test. |

#### Returns

`boolean`

True if this is potentially a match.

___

### to5Bit

▸ **to5Bit**(`bytes`): `Uint8Array`

Convert the input bytes into 5 bit data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The bytes to convert. |

#### Returns

`Uint8Array`

The data in 5 bit form.
