# Class: Bip39

Implementation of Bip39 for mnemonic generation.

## Constructors

### new Bip39()

> **new Bip39**(): [`Bip39`](Bip39.md)

#### Returns

[`Bip39`](Bip39.md)

## Methods

### randomMnemonic()

> `static` **randomMnemonic**(`strength`, `words`): `string`

Generate a random mnemonic.

#### Parameters

##### strength

`number` = `256`

The strength of the mnemonic to generate, defaults to 256.

##### words

`string`[] = `wordlist`

The wordlist to use, defaults to the English wordlist.

#### Returns

`string`

The random mnemonic.

#### Throws

Error if the length is not a multiple of 32.

***

### entropyToMnemonic()

> `static` **entropyToMnemonic**(`entropy`, `words`): `string`

Generate a mnemonic from the entropy.

#### Parameters

##### entropy

`Uint8Array`

The entropy to generate.

##### words

`string`[] = `wordlist`

The wordlist to use, defaults to the English wordlist.

#### Returns

`string`

The mnemonic.

#### Throws

Error if the length of the entropy is not a multiple of 4, or is less than 16 or greater than 32.

***

### mnemonicToSeed()

> `static` **mnemonicToSeed**(`mnemonic`, `password`?): `Uint8Array`

Convert a mnemonic to a seed.

#### Parameters

##### mnemonic

`string`

The mnemonic to convert.

##### password?

`string`

The password to apply to the seed generation.

#### Returns

`Uint8Array`

The seed.

***

### mnemonicToEntropy()

> `static` **mnemonicToEntropy**(`mnemonic`, `words`): `Uint8Array`

Convert the mnemonic back to entropy.

#### Parameters

##### mnemonic

`string`

The mnemonic to convert.

##### words

`string`[] = `wordlist`

The wordlist to use, defaults to the English wordlist.

#### Returns

`Uint8Array`

The entropy.

#### Throws

Error if the number of words is not a multiple of 3.
