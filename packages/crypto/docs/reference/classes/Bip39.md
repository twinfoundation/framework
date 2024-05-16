[**@gtsc/crypto**](../README.md) • **Docs**

***

# Class: Bip39

Implementation of Bip39 for mnemonic generation.

## Constructors

### new Bip39()

> **new Bip39**(): [`Bip39`](Bip39.md)

#### Returns

[`Bip39`](Bip39.md)

## Methods

### entropyChecksumBits()

> `static` **entropyChecksumBits**(`entropy`): `string`

Calculate the entropy checksum.

#### Parameters

• **entropy**: `Uint8Array`

The entropy to calculate the checksum for.

#### Returns

`string`

The checksum.

***

### entropyToMnemonic()

> `static` **entropyToMnemonic**(`entropy`): `string`

Generate a mnemonic from the entropy.

#### Parameters

• **entropy**: `Uint8Array`

The entropy to generate.

#### Returns

`string`

The mnemonic.

#### Throws

Error if the length of the entropy is not a multiple of 4, or is less than 16 or greater than 32.

***

### mnemonicToEntropy()

> `static` **mnemonicToEntropy**(`mnemonic`): `Uint8Array`

Convert the mnemonic back to entropy.

#### Parameters

• **mnemonic**: `string`

The mnemonic to convert.

#### Returns

`Uint8Array`

The entropy.

#### Throws

Error if the number of words is not a multiple of 3.

***

### mnemonicToSeed()

> `static` **mnemonicToSeed**(`mnemonic`, `password`?, `iterations`?, `keyLength`?): `Uint8Array`

Convert a mnemonic to a seed.

#### Parameters

• **mnemonic**: `string`

The mnemonic to convert.

• **password?**: `string`

The password to apply to the seed generation.

• **iterations?**: `number`= `2048`

The number of iterations to perform on the password function, defaults to 2048.

• **keyLength?**: `number`= `64`

The size of the key length to generate, defaults to 64.

#### Returns

`Uint8Array`

The seed.

***

### randomMnemonic()

> `static` **randomMnemonic**(`length`): `string`

Generate a random mnemonic.

#### Parameters

• **length**: `number`= `256`

The length of the mnemonic to generate, defaults to 256.

#### Returns

`string`

The random mnemonic.

#### Throws

Error if the length is not a multiple of 32.

***

### setWordList()

> `static` **setWordList**(`wordlistData`, `joiningChar`): `void`

Set the wordlist and joining character.

#### Parameters

• **wordlistData**: `string`[]

Array of words.

• **joiningChar**: `string`= `" "`

The character to join the words with.

#### Returns

`void`
