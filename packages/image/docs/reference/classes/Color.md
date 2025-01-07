# Class: Color

Class to represent a color.

## Constructors

### new Color()

> **new Color**(`alpha`, `red`, `green`, `blue`): [`Color`](Color.md)

Create a new instance of color.

#### Parameters

##### alpha

`number`

The alpha element of the color.

##### red

`number`

The red element of the color.

##### green

`number`

The green element of the color.

##### blue

`number`

The blue element of the color.

#### Returns

[`Color`](Color.md)

## Methods

### fromHex()

> `static` **fromHex**(`hex`): [`Color`](Color.md)

Construct a color from a hex string.

#### Parameters

##### hex

`string`

The hex string to parse.

#### Returns

[`Color`](Color.md)

The color.

#### Throws

Error if the format is incorrect.

***

### coerce()

> `static` **coerce**(`value`): `undefined` \| [`Color`](Color.md)

Coerce an unknown type to a color.

#### Parameters

##### value

`unknown`

The value to try and convert.

#### Returns

`undefined` \| [`Color`](Color.md)

The color if one can be created.

***

### alpha()

> **alpha**(): `number`

Get the alpha element.

#### Returns

`number`

The alpha element.

***

### red()

> **red**(): `number`

Get the red element.

#### Returns

`number`

The red element.

***

### green()

> **green**(): `number`

Get the green element.

#### Returns

`number`

The green element.

***

### blue()

> **blue**(): `number`

Get the blue element.

#### Returns

`number`

The blue element.

***

### argb()

> **argb**(): `number`

Get color as argb.

#### Returns

`number`

The color as argb.

***

### rgba()

> **rgba**(): `number`

Get color as rgba.

#### Returns

`number`

The color as rgba.

***

### rgbText()

> **rgbText**(): `string`

Get color as rgb text.

#### Returns

`string`

The color as rgb.

***

### rgbaText()

> **rgbaText**(): `string`

Get color as rgba text.

#### Returns

`string`

The color as rgba.

***

### hex()

> **hex**(): `string`

Get color as hex no alpha.

#### Returns

`string`

The color as hex with no alpha component.

***

### hexWithAlpha()

> **hexWithAlpha**(): `string`

Get color as hex with alpha.

#### Returns

`string`

The color as hex with with alpha component.
