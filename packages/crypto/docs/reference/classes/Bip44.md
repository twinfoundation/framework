# Class: Bip44

Implementation of Bip44 for address generation.

## Constructors

### new Bip44()

> **new Bip44**(): [`Bip44`](Bip44.md)

#### Returns

[`Bip44`](Bip44.md)

## Methods

### addressBech32()

> `static` **addressBech32**(`seed`, `keyType`, `hrp`, `coinType`, `accountIndex`, `isInternal`, `addressIndex`): `object`

Generate a bip44 address from the seed and parts.

#### Parameters

• **seed**: `Uint8Array`

The account seed.

• **keyType**: [`KeyType`](../enumerations/KeyType.md)

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

The generated path.

##### address

> **address**: `string`

##### keyPair

> **keyPair**: [`IKeyPair`](../interfaces/IKeyPair.md)

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

### keyPair()

> `static` **keyPair**(`seed`, `keyType`, `coinType`, `accountIndex`, `isInternal`, `addressIndex`): [`IKeyPair`](../interfaces/IKeyPair.md)

Generate a bip44 key pair from the seed and parts.

#### Parameters

• **seed**: `Uint8Array`

The account seed.

• **keyType**: [`KeyType`](../enumerations/KeyType.md)

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

[`IKeyPair`](../interfaces/IKeyPair.md)

The key pair.

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
