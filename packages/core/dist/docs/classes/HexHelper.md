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

#### Defined in

[packages/core/src/utils/hexHelper.ts:11](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/hexHelper.ts#L11)

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

#### Defined in

[packages/core/src/utils/hexHelper.ts:56](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/hexHelper.ts#L56)

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

#### Defined in

[packages/core/src/utils/hexHelper.ts:20](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/hexHelper.ts#L20)

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

#### Defined in

[packages/core/src/utils/hexHelper.ts:65](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/hexHelper.ts#L65)

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

#### Defined in

[packages/core/src/utils/hexHelper.ts:47](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/hexHelper.ts#L47)

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

#### Defined in

[packages/core/src/utils/hexHelper.ts:32](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/hexHelper.ts#L32)
