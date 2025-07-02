# Class: JpegEncoder

JPEG Encoder.
Based on JPEG encoder ported to JavaScript and optimized by Andreas Ritter.

## Constructors

### Constructor

> **new JpegEncoder**(): `JpegEncoder`

Create a new instance of JpegEncoder.

#### Returns

`JpegEncoder`

## Methods

### encode()

> **encode**(`width`, `height`, `imageData`, `quality`): `Uint8Array`

Encode the image with the given quality.

#### Parameters

##### width

`number`

The width of the image to encode.

##### height

`number`

The height of the image to encode.

##### imageData

`Uint8Array`

The data for the image.

##### quality

`number`

The quality to encode the image at.

#### Returns

`Uint8Array`

The data for the encoded image.
