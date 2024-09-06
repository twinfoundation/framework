# Class: MimeTypeHelper

Class to help with mime types.

## Constructors

### new MimeTypeHelper()

> **new MimeTypeHelper**(): [`MimeTypeHelper`](MimeTypeHelper.md)

#### Returns

[`MimeTypeHelper`](MimeTypeHelper.md)

## Methods

### detect()

> `static` **detect**(`data`): `Promise`\<`undefined` \| `string`\>

Detect the mime type from a byte array.

#### Parameters

• **data**: `Uint8Array`

The data to test.

#### Returns

`Promise`\<`undefined` \| `string`\>

The mime type if detected.

***

### defaultExtension()

> `static` **defaultExtension**(`mimeType`): `undefined` \| `string`

Return the default extension for a mime type.

#### Parameters

• **mimeType**: `undefined` \| `string`

The mimetype to get the extension for.

#### Returns

`undefined` \| `string`

The extension for the mime type.
