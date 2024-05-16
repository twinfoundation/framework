# Class: BitString

A class to represent a bit string.

## Constructors

### new BitString()

> **new BitString**(`numberBits`): [`BitString`](BitString.md)

Create a new instance of BitString.

#### Parameters

• **numberBits**: `number`

The length of the bit string.

#### Returns

[`BitString`](BitString.md)

## Methods

### getBit()

> **getBit**(`index`): `boolean`

Get the bit at the given index.

#### Parameters

• **index**: `number`

The index to get the bit for.

#### Returns

`boolean`

True if the bit at the index is set.

#### Throws

GeneralError if the index is out of range.

***

### getBits()

> **getBits**(): `Uint8Array`

Get the bits of the bit string.

#### Returns

`Uint8Array`

The bits stored in a Uint8Array.

***

### getLength()

> **getLength**(): `number`

Get the length of the bit string.

#### Returns

`number`

The length of the bit string.

***

### setBit()

> **setBit**(`index`, `value`): `void`

Set the bit at the given index.

#### Parameters

• **index**: `number`

The index to set the bit for.

• **value**: `boolean`

The value to set the bit to.

#### Returns

`void`

#### Throws

GeneralError if the index is out of range.

***

### fromBits()

> `static` **fromBits**(`bits`, `numberBits`): [`BitString`](BitString.md)

Create a new instance of BitString from a bit array.

#### Parameters

• **bits**: `Uint8Array`

The bits to create the bit string from.

• **numberBits**: `number`

The number of bits in the bit string.

#### Returns

[`BitString`](BitString.md)

The new instance of BitString.
