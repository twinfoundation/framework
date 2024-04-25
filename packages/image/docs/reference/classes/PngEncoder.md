# Class: PngEncoder

PNG Encoder.
Based on https://github.com/photopea/UPNG.js.

## Constructors

### constructor

• **new PngEncoder**(): [`PngEncoder`](PngEncoder.md)

#### Returns

[`PngEncoder`](PngEncoder.md)

## Methods

### encode

▸ **encode**(`buffers`, `w`, `h`): `Promise`\<`Uint8Array`\>

Encode the image frames to png.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffers` | `ArrayBuffer`[] | The frame buffers to encode. |
| `w` | `number` | The image width. |
| `h` | `number` | The image height. |

#### Returns

`Promise`\<`Uint8Array`\>

The data for the image.
