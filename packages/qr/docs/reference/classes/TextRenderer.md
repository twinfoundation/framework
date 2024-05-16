# Class: TextRenderer

Class to render qr data as text.

## Constructors

### new TextRenderer()

> **new TextRenderer**(): [`TextRenderer`](TextRenderer.md)

#### Returns

[`TextRenderer`](TextRenderer.md)

## Methods

### render()

> `static` **render**(`cellData`, `options`?): `Promise`\<`string`\>

Render the QR code data as text.

#### Parameters

• **cellData**: [`QRCellData`](../type-aliases/QRCellData.md)

The cell data for the QR code.

• **options?**: [`ITextRendererOptions`](../interfaces/ITextRendererOptions.md)

The options for rendering.

#### Returns

`Promise`\<`string`\>

The text content.
