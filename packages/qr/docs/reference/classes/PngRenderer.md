# Class: PngRenderer

Class to render qr data as png.

## Constructors

### Constructor

> **new PngRenderer**(): `PngRenderer`

#### Returns

`PngRenderer`

## Methods

### render()

> `static` **render**(`cellData`, `options?`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Render the QR code data as a bitmap.

#### Parameters

##### cellData

[`QRCellData`](../type-aliases/QRCellData.md)

The cell data for the QR code.

##### options?

[`IBitmapRendererOptions`](../interfaces/IBitmapRendererOptions.md)

The options for rendering.

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

The bitmap content.
