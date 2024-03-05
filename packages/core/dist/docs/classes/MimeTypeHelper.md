# Class: MimeTypeHelper

Class to help with mime types.

## Constructors

### constructor

• **new MimeTypeHelper**(): [`MimeTypeHelper`](MimeTypeHelper.md)

#### Returns

[`MimeTypeHelper`](MimeTypeHelper.md)

## Methods

### defaultExtension

▸ **defaultExtension**(`mimeType`): `undefined` \| `string`

Return the default extension for a mime type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mimeType` | `undefined` \| `string` | The mimetype to get the extension for. |

#### Returns

`undefined` \| `string`

The extension for the mime type.

#### Defined in

[packages/core/src/utils/mimeTypeHelper.ts:89](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/mimeTypeHelper.ts#L89)

___

### detect

▸ **detect**(`data`): `Promise`\<`undefined` \| `string`\>

Detect the mime type from a byte array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The data to test. |

#### Returns

`Promise`\<`undefined` \| `string`\>

The mime type if detected.

#### Defined in

[packages/core/src/utils/mimeTypeHelper.ts:17](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/mimeTypeHelper.ts#L17)
