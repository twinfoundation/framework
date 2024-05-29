# Class: Bip44

Implementation of Bip44 for address generation.

## Constructors

### new Bip44()

> **new Bip44**(): [`Bip44`](Bip44.md)

#### Returns

[`Bip44`](Bip44.md)

## Methods

### keyPair()

> `static` **keyPair**(`seed`, `keyType`, `coinType`, `accountIndex`, `isInternal`, `addressIndex`): `object`

Generate a bip44 key pair from the seed and parts.

#### Parameters

• **seed**: `Uint8Array`

The account seed.

• **keyType**: [`KeyType`](../type-aliases/KeyType.md)

The key type.

• **coinType**: `number`

The coin type.

• **accountIndex**: `number`

The account index.

• **isInternal**: `boolean`

Is this an internal address.

• **addressIndex**: `number`

The address index.

#### Returns

`object`

The key pair.

##### privateKey

> **privateKey**: `Uint8Array`

##### publicKey

> **publicKey**: `Uint8Array`

#### Throws

Error if the address type is not supported.

***

### path()

> `static` **path**(`coinType`, `accountIndex`, `isInternal`, `addressIndex`): [`Bip32Path`](Bip32Path.md)

Generate a bip44 path based on all its parts.

#### Parameters

• **coinType**: `number`

The coin type.

• **accountIndex**: `number`

The account index.

• **isInternal**: `boolean`

Is this an internal address.

• **addressIndex**: `number`

The address index.

#### Returns

[`Bip32Path`](Bip32Path.md)

The generated path.

***

### basePath()

> `static` **basePath**(`coinType`): `string`

Create a bip44 base path for the provided coin type.

#### Parameters

• **coinType**: `number`

The coin type.

#### Returns

`string`

The bip44 address base path.

***

### addressBech32()

> `static` **addressBech32**(`seed`, `keyType`, `hrp`, `coinType`, `accountIndex`, `isInternal`, `addressIndex`): `object`

Generate a bech32 address from the seed and parts.

#### Parameters

• **seed**: `Uint8Array`

The account seed.

• **keyType**: [`KeyType`](../type-aliases/KeyType.md)

The key type.

• **hrp**: `string`

The human readable part of the address.

• **coinType**: `number`

The coin type.

• **accountIndex**: `number`

The account index.

• **isInternal**: `boolean`

Is this an internal address.

• **addressIndex**: `number`

The address index.

#### Returns

`object`

The generated path and the associated keypair.

##### address

> **address**: `string`

##### privateKey

> **privateKey**: `Uint8Array`

##### publicKey

> **publicKey**: `Uint8Array`
