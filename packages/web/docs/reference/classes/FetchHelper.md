# Class: FetchHelper

Class to helper with fetch operations.

## Constructors

### constructor

• **new FetchHelper**(): [`FetchHelper`](FetchHelper.md)

#### Returns

[`FetchHelper`](FetchHelper.md)

## Methods

### fetch

▸ **fetch**(`source`, `endpoint`, `path`, `method`, `body?`, `options?`): `Promise`\<`Response`\>

Perform a fetch request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source for the request. |
| `endpoint` | `string` | The base endpoint for the request. |
| `path` | `string` | The path of the request. |
| `method` | [`HttpMethods`](../modules.md#httpmethods) | The http method. |
| `body?` | `string` \| `Uint8Array` | Request to send to the endpoint. |
| `options?` | [`IFetchOptions`](../interfaces/IFetchOptions.md) | Options for sending the requests. |

#### Returns

`Promise`\<`Response`\>

The response.

___

### fetchBinary

▸ **fetchBinary**\<`T`\>(`source`, `endpoint`, `path`, `method`, `requestData?`, `options?`): `Promise`\<`Uint8Array` \| `T`\>

Perform a request for binary data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source for the request. |
| `endpoint` | `string` | The base endpoint for the request. |
| `path` | `string` | The path of the request. |
| `method` | ``"GET"`` \| ``"POST"`` | The http method. |
| `requestData?` | `Uint8Array` | Request to send to the endpoint. |
| `options?` | [`IFetchOptions`](../interfaces/IFetchOptions.md) | Options for sending the requests. |

#### Returns

`Promise`\<`Uint8Array` \| `T`\>

The response.

___

### fetchJson

▸ **fetchJson**\<`T`, `U`\>(`source`, `endpoint`, `path`, `method`, `requestData?`, `options?`): `Promise`\<`U`\>

Perform a request in json format.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source for the request. |
| `endpoint` | `string` | The base endpoint for the request. |
| `path` | `string` | The path of the request. |
| `method` | [`HttpMethods`](../modules.md#httpmethods) | The http method. |
| `requestData?` | `T` | Request to send to the endpoint. |
| `options?` | [`IFetchOptions`](../interfaces/IFetchOptions.md) | Options for sending the requests. |

#### Returns

`Promise`\<`U`\>

The response.
