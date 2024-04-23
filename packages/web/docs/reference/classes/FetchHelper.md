# Class: FetchHelper

Class to helper with fetch operations.

## Constructors

### constructor

• **new FetchHelper**(): [`FetchHelper`](FetchHelper.md)

#### Returns

[`FetchHelper`](FetchHelper.md)

## Methods

### fetchBinary

▸ **fetchBinary**\<`T`\>(`source`, `endpoint`, `route`, `method`, `requestData?`, `options?`): `Promise`\<`Uint8Array` \| `T`\>

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
| `route` | `string` | The route of the request. |
| `method` | ``"get"`` \| ``"post"`` | The http method. |
| `requestData?` | `Uint8Array` | Request to send to the endpoint. |
| `options?` | `Object` | Options for sending the requests. |
| `options.baseDelayMilliseconds?` | `number` | The number of milliseconds we should delay any retry with. |
| `options.extraHeaders?` | [`IHttpRequestHeaders`](../interfaces/IHttpRequestHeaders.md) | Include those extra headers. |
| `options.includeCredentials?` | `boolean` | Include credentials in the requests. |
| `options.maxRetries?` | `number` | The number of times to retry fetching defaults to no retries. |
| `options.timeout?` | `number` | Timeout for requests. |

#### Returns

`Promise`\<`Uint8Array` \| `T`\>

The response.

___

### fetchJson

▸ **fetchJson**\<`T`, `U`\>(`source`, `endpoint`, `route`, `method`, `requestData?`, `options?`): `Promise`\<`U`\>

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
| `route` | `string` | The route of the request. |
| `method` | [`HttpRestVerbs`](../modules.md#httprestverbs) | The http method. |
| `requestData?` | `T` | Request to send to the endpoint. |
| `options?` | `Object` | Options for sending the requests. |
| `options.baseDelayMilliseconds?` | `number` | The number of milliseconds we should delay any retry with. |
| `options.extraHeaders?` | [`IHttpRequestHeaders`](../interfaces/IHttpRequestHeaders.md) | Include those extra headers. |
| `options.includeCredentials?` | `boolean` | Include credentials in the requests. |
| `options.maxRetries?` | `number` | The number of times to retry fetching defaults to no retries. |
| `options.timeout?` | `number` | Timeout for requests. |

#### Returns

`Promise`\<`U`\>

The response.

___

### fetchWithTimeout

▸ **fetchWithTimeout**(`source`, `endpoint`, `route`, `method`, `headers?`, `body?`, `options?`): `Promise`\<`Response`\>

Perform a fetch request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source for the request. |
| `endpoint` | `string` | The base endpoint for the request. |
| `route` | `string` | The route of the request. |
| `method` | [`HttpRestVerbs`](../modules.md#httprestverbs) | The http method. |
| `headers?` | [`IHttpRequestHeaders`](../interfaces/IHttpRequestHeaders.md) | The headers for the request. |
| `body?` | `string` \| `Uint8Array` | Request to send to the endpoint. |
| `options?` | `Object` | Options for sending the requests. |
| `options.baseDelayMilliseconds?` | `number` | The number of milliseconds we should delay any retry with. |
| `options.extraHeaders?` | [`IHttpRequestHeaders`](../interfaces/IHttpRequestHeaders.md) | Include those extra headers. |
| `options.includeCredentials?` | `boolean` | Include credentials in the requests. |
| `options.maxRetries?` | `number` | The number of times to retry fetching defaults to no retries. |
| `options.timeout?` | `number` | Timeout for requests. |

#### Returns

`Promise`\<`Response`\>

The response.
