# Class: Color

Class to represent a color.

## Constructors

### constructor

• **new Color**(`alpha`, `red`, `green`, `blue`): [`Color`](Color.md)

Create a new instance of color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alpha` | `number` | The alpha element of the color. |
| `red` | `number` | The red element of the color. |
| `green` | `number` | The green element of the color. |
| `blue` | `number` | The blue element of the color. |

#### Returns

[`Color`](Color.md)

## Methods

### alpha

▸ **alpha**(): `number`

Get the alpha element.

#### Returns

`number`

The alpha element.

___

### argb

▸ **argb**(): `number`

Get color as argb.

#### Returns

`number`

The color as argb.

___

### blue

▸ **blue**(): `number`

Get the blue element.

#### Returns

`number`

The blue element.

___

### green

▸ **green**(): `number`

Get the green element.

#### Returns

`number`

The green element.

___

### hex

▸ **hex**(): `string`

Get color as hex no alpha.

#### Returns

`string`

The color as hex with no alpha component.

___

### hexWithAlpha

▸ **hexWithAlpha**(): `string`

Get color as hex with alpha.

#### Returns

`string`

The color as hex with with alpha component.

___

### red

▸ **red**(): `number`

Get the red element.

#### Returns

`number`

The red element.

___

### rgbText

▸ **rgbText**(): `string`

Get color as rgb text.

#### Returns

`string`

The color as rgb.

___

### rgba

▸ **rgba**(): `number`

Get color as rgba.

#### Returns

`number`

The color as rgba.

___

### rgbaText

▸ **rgbaText**(): `string`

Get color as rgba text.

#### Returns

`string`

The color as rgba.

___

### coerce

▸ **coerce**(`value`): `undefined` \| [`Color`](Color.md)

Coerce an unknown type to a color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to try and convert. |

#### Returns

`undefined` \| [`Color`](Color.md)

The color if one can be created.

___

### fromHex

▸ **fromHex**(`hex`): [`Color`](Color.md)

Construct a color from a hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex string to parse. |

#### Returns

[`Color`](Color.md)

The color.

**`Throws`**

Error if the format is incorrect.
