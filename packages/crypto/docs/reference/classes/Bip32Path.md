# Class: Bip32Path

Class to help with bip32 paths.

## Constructors

### Constructor

> **new Bip32Path**(`initialPath?`): `Bip32Path`

Create a new instance of Bip32Path.

#### Parameters

##### initialPath?

`string`

Initial path to create.

#### Returns

`Bip32Path`

## Methods

### fromPath()

> `static` **fromPath**(`bip32Path`): `Bip32Path`

Construct a new path by cloning an existing one.

#### Parameters

##### bip32Path

`Bip32Path`

The path to clone.

#### Returns

`Bip32Path`

A new instance of Bip32Path.

***

### toString()

> **toString**(): `string`

Converts the path to a string.

#### Returns

`string`

The path as a string.

***

### push()

> **push**(`index`): `void`

Push a new index on to the path.

#### Parameters

##### index

`number`

The index to add to the path.

#### Returns

`void`

***

### pushHardened()

> **pushHardened**(`index`): `void`

Push a new hardened index on to the path.

#### Parameters

##### index

`number`

The index to add to the path.

#### Returns

`void`

***

### pop()

> **pop**(): `void`

Pop an index from the path.

#### Returns

`void`

***

### numberSegments()

> **numberSegments**(): `number`[]

Get the segments.

#### Returns

`number`[]

The segments as numbers.
