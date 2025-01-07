# Class: JpegRenderer

Class to render qr data as jpeg.

## Constructors

### new JpegRenderer()

> **new JpegRenderer**(): [`JpegRenderer`](JpegRenderer.md)

#### Returns

[`JpegRenderer`](JpegRenderer.md)

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
