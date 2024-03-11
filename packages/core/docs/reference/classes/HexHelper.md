# Class: HexHelper

Helper methods for hex conversions.

## Constructors

### constructor

• **new HexHelper**(): [`HexHelper`](HexHelper.md)

#### Returns

[`HexHelper`](HexHelper.md)

## Properties

### BIG\_INT\_MAX\_256\_BIT

▪ `Static` `Readonly` **BIG\_INT\_MAX\_256\_BIT**: `bigint`

Const defining the maximum value for a 256 bit int.

## Methods

### addPrefix

▸ **addPrefix**(`hex`): `string`

Add the 0x prefix if it does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to add the prefix to. |

#### Returns

`string`

The hex with the prefix.

___

### fromBigInt256

▸ **fromBigInt256**(`value`): `string`

Convert the big int 256 bit to hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `bigint` | The big int value to convert. |

#### Returns

`string`

The hex encoded big int.

___

### hasPrefix

▸ **hasPrefix**(`hex`): `boolean`

Does the hex string have the prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to check for the prefix. |

#### Returns

`boolean`

True if the hex string has the prefix.

___

### isHex

▸ **isHex**(`value`, `allowPrefix?`): `boolean`

Is the data hex format.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `string` | `undefined` | The value to test. |
| `allowPrefix` | `boolean` | `false` | Allow the hex to have the 0x prefix. |

#### Returns

`boolean`

True if the string is hex.

___

### stripPrefix

▸ **stripPrefix**(`hex`): `string`

Strip the 0x prefix if it exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to strip. |

#### Returns

`string`

The stripped hex without the prefix.

___

### toBigInt256

▸ **toBigInt256**(`hex`): `bigint`

Convert the hex string to a big int.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value to convert. |

#### Returns

`bigint`

The big int.
