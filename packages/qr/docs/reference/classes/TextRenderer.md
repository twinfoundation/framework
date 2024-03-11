# Class: TextRenderer

Class to render qr data as text.

## Constructors

### constructor

• **new TextRenderer**(): [`TextRenderer`](TextRenderer.md)

#### Returns

[`TextRenderer`](TextRenderer.md)

## Methods

### render

▸ **render**(`cellData`, `options?`): `Promise`\<`string`\>

Render the QR code data as text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cellData` | [`QRCellData`](../modules.md#qrcelldata) | The cell data for the QR code. |
| `options?` | [`ITextRendererOptions`](../interfaces/ITextRendererOptions.md) | The options for rendering. |

#### Returns

`Promise`\<`string`\>

The text content.
