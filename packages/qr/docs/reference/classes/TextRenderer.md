# Class: TextRenderer

Class to render qr data as text.

## Constructors

### Constructor

> **new TextRenderer**(): `TextRenderer`

#### Returns

`TextRenderer`

## Methods

### render()

> `static` **render**(`cellData`, `options?`): `Promise`\<`string`\>

Render the QR code data as text.

#### Parameters

##### cellData

[`QRCellData`](../type-aliases/QRCellData.md)

The cell data for the QR code.

##### options?

[`ITextRendererOptions`](../interfaces/ITextRendererOptions.md)

The options for rendering.

#### Returns

`Promise`\<`string`\>

The text content.
