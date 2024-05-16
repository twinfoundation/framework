# Class: HexHelper

Helper methods for hex conversions.

## Constructors

### new HexHelper()

> **new HexHelper**(): [`HexHelper`](HexHelper.md)

#### Returns

[`HexHelper`](HexHelper.md)

## Properties

### BIG\_INT\_MAX\_256\_BIT

> `static` `readonly` **BIG\_INT\_MAX\_256\_BIT**: `bigint`

Const defining the maximum value for a 256 bit int.

## Methods

### addPrefix()

> `static` **addPrefix**(`hex`): `string`

Add the 0x prefix if it does not exist.

#### Parameters

• **hex**: `string`

The hex value to add the prefix to.

#### Returns

`string`

The hex with the prefix.

***

### fromBigInt256()

> `static` **fromBigInt256**(`value`): `string`

Convert the big int 256 bit to hex string.

#### Parameters

• **value**: `bigint`

The big int value to convert.

#### Returns

`string`

The hex encoded big int.

***

### hasPrefix()

> `static` **hasPrefix**(`hex`): `boolean`

Does the hex string have the prefix.

#### Parameters

• **hex**: `string`

The hex value to check for the prefix.

#### Returns

`boolean`

True if the hex string has the prefix.

***

### isHex()

> `static` **isHex**(`value`, `allowPrefix`): `boolean`

Is the data hex format.

#### Parameters

• **value**: `string`

The value to test.

• **allowPrefix**: `boolean`= `false`

Allow the hex to have the 0x prefix.

#### Returns

`boolean`

True if the string is hex.

***

### stripPrefix()

> `static` **stripPrefix**(`hex`): `string`

Strip the 0x prefix if it exists.

#### Parameters

• **hex**: `string`

The hex value to strip.

#### Returns

`string`

The stripped hex without the prefix.

***

### toBigInt256()

> `static` **toBigInt256**(`hex`): `bigint`

Convert the hex string to a big int.

#### Parameters

• **hex**: `string`

The hex value to convert.

#### Returns

`bigint`

The big int.
