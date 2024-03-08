# Class: Bip32Path

Class to help with bip32 paths.

## Constructors

### constructor

• **new Bip32Path**(`initialPath?`): [`Bip32Path`](Bip32Path.md)

Create a new instance of Bip32Path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialPath?` | `string` | Initial path to create. |

#### Returns

[`Bip32Path`](Bip32Path.md)

## Methods

### numberSegments

▸ **numberSegments**(): `number`[]

Get the segments.

#### Returns

`number`[]

The segments as numbers.

___

### pop

▸ **pop**(): `void`

Pop an index from the path.

#### Returns

`void`

___

### push

▸ **push**(`index`): `void`

Push a new index on to the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to add to the path. |

#### Returns

`void`

___

### pushHardened

▸ **pushHardened**(`index`): `void`

Push a new hardened index on to the path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to add to the path. |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Converts the path to a string.

#### Returns

`string`

The path as a string.

___

### fromPath

▸ **fromPath**(`bip32Path`): [`Bip32Path`](Bip32Path.md)

Construct a new path by cloning an existing one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bip32Path` | [`Bip32Path`](Bip32Path.md) | The path to clone. |

#### Returns

[`Bip32Path`](Bip32Path.md)

A new instance of Bip32Path.
