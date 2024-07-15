# Class: QR

Class to generates QR codes from data.
Based on https://github.com/kazuhikoarase/qrcode-generator/ .

## Constructors

### new QR()

> **new QR**(`typeNumber`, `errorCorrectLevel`): [`QR`](QR.md)

Create a new instance of QR.

#### Parameters

• **typeNumber**: `number`= `6`

0 to 40, 0 means autodetect.

• **errorCorrectLevel**: [`ErrorCorrectLevel`](../type-aliases/ErrorCorrectLevel.md)= `ErrorCorrectLevel.L`

'L','M','Q','H'.

#### Returns

[`QR`](QR.md)

#### Throws

Error if the typeNumber is invalid.

## Methods

### addText()

> **addText**(`qrData`): `void`

Add text data to the QR Code.

#### Parameters

• **qrData**: `string`

The data to add.

#### Returns

`void`

***

### addNumber()

> **addNumber**(`qrData`): `void`

Add number to the QR Code.

#### Parameters

• **qrData**: `string`

The data to add.

#### Returns

`void`

***

### addAlphaNumeric()

> **addAlphaNumeric**(`qrData`): `void`

Add alpha numeric to the QR Code.

#### Parameters

• **qrData**: `string`

The data to add.

#### Returns

`void`

***

### generate()

> **generate**(): [`QRCellData`](../type-aliases/QRCellData.md)

Generate the display buffer.

#### Returns

[`QRCellData`](../type-aliases/QRCellData.md)

Boolean buffer of pixels.
