# Class: PngRenderer

Class to render qr data as png.

## Constructors

### new PngRenderer()

> **new PngRenderer**(): [`PngRenderer`](PngRenderer.md)

#### Returns

[`PngRenderer`](PngRenderer.md)

## Methods

### render()

> `static` **render**(`cellData`, `options`?): `Promise`\<`Uint8Array`\>

Render the QR code data as a bitmap.

#### Parameters

##### cellData

[`QRCellData`](../type-aliases/QRCellData.md)

The cell data for the QR code.

##### options?

[`IBitmapRendererOptions`](../interfaces/IBitmapRendererOptions.md)

The options for rendering.

#### Returns

`Promise`\<`Uint8Array`\>

The bitmap content.
