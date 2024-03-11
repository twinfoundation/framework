# Class: QR

Class to generates QR codes from data.
Based on https://github.com/kazuhikoarase/qrcode-generator/ .

## Constructors

### constructor

• **new QR**(`typeNumber?`, `errorCorrectLevel?`): [`QR`](QR.md)

Create a new instance of QR.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `typeNumber` | `number` | `6` | 0 to 40, 0 means autodetect. |
| `errorCorrectLevel` | [`ErrorCorrectLevel`](../enums/ErrorCorrectLevel.md) | `ErrorCorrectLevel.L` | 'L','M','Q','H'. |

#### Returns

[`QR`](QR.md)

**`Throws`**

Error if the typeNumber is invalid.

## Methods

### addAlphaNumeric

▸ **addAlphaNumeric**(`qrData`): `void`

Add alpha numeric to the QR Code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `qrData` | `string` | The data to add. |

#### Returns

`void`

___

### addNumber

▸ **addNumber**(`qrData`): `void`

Add number to the QR Code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `qrData` | `string` | The data to add. |

#### Returns

`void`

___

### addText

▸ **addText**(`qrData`): `void`

Add text data to the QR Code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `qrData` | `string` | The data to add. |

#### Returns

`void`

___

### generate

▸ **generate**(): [`QRCellData`](../modules.md#qrcelldata)

Generate the display buffer.

#### Returns

[`QRCellData`](../modules.md#qrcelldata)

Boolean buffer of pixels.
