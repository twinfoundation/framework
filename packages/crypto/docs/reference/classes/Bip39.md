# Class: Bip39

Implementation of Bip39 for mnemonic generation.

## Constructors

### constructor

• **new Bip39**(): [`Bip39`](Bip39.md)

#### Returns

[`Bip39`](Bip39.md)

## Methods

### entropyChecksumBits

▸ **entropyChecksumBits**(`entropy`): `string`

Calculate the entropy checksum.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entropy` | `Uint8Array` | The entropy to calculate the checksum for. |

#### Returns

`string`

The checksum.

___

### entropyToMnemonic

▸ **entropyToMnemonic**(`entropy`): `string`

Generate a mnemonic from the entropy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entropy` | `Uint8Array` | The entropy to generate. |

#### Returns

`string`

The mnemonic.

**`Throws`**

Error if the length of the entropy is not a multiple of 4, or is less than 16 or greater than 32.

___

### mnemonicToEntropy

▸ **mnemonicToEntropy**(`mnemonic`): `Uint8Array`

Convert the mnemonic back to entropy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic to convert. |

#### Returns

`Uint8Array`

The entropy.

**`Throws`**

Error if the number of words is not a multiple of 3.

___

### mnemonicToSeed

▸ **mnemonicToSeed**(`mnemonic`, `password?`, `iterations?`, `keyLength?`): `Uint8Array`

Convert a mnemonic to a seed.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mnemonic` | `string` | `undefined` | The mnemonic to convert. |
| `password?` | `string` | `undefined` | The password to apply to the seed generation. |
| `iterations` | `number` | `2048` | The number of iterations to perform on the password function, defaults to 2048. |
| `keyLength` | `number` | `64` | The size of the key length to generate, defaults to 64. |

#### Returns

`Uint8Array`

The seed.

___

### randomMnemonic

▸ **randomMnemonic**(`length?`): `string`

Generate a random mnemonic.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `length` | `number` | `256` | The length of the mnemonic to generate, defaults to 256. |

#### Returns

`string`

The random mnemonic.

**`Throws`**

Error if the length is not a multiple of 32.

___

### setWordList

▸ **setWordList**(`wordlistData`, `joiningChar?`): `void`

Set the wordlist and joining character.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wordlistData` | `string`[] | `undefined` | Array of words. |
| `joiningChar` | `string` | `" "` | The character to join the words with. |

#### Returns

`void`
