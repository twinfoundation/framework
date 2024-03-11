# Class: PngRenderer

Class to render qr data as png.

## Constructors

### constructor

• **new PngRenderer**(): [`PngRenderer`](PngRenderer.md)

#### Returns

[`PngRenderer`](PngRenderer.md)

## Methods

### render

▸ **render**(`cellData`, `options?`): `Promise`\<`Uint8Array`\>

Render the QR code data as a bitmap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cellData` | [`QRCellData`](../modules.md#qrcelldata) | The cell data for the QR code. |
| `options?` | [`IBitmapRendererOptions`](../interfaces/IBitmapRendererOptions.md) | The options for rendering. |

#### Returns

`Promise`\<`Uint8Array`\>

The bitmap content.
