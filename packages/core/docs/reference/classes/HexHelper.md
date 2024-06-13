# Class: HexHelper

Helper methods for hex conversions.

## Constructors

### new HexHelper()

> **new HexHelper**(): [`HexHelper`](HexHelper.md)

#### Returns

[`HexHelper`](HexHelper.md)

## Methods

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
