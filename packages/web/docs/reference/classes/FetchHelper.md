# Class: FetchHelper

Class to helper with fetch operations.

## Constructors

### new FetchHelper()

> **new FetchHelper**(): [`FetchHelper`](FetchHelper.md)

#### Returns

[`FetchHelper`](FetchHelper.md)

## Methods

### fetch()

> `static` **fetch**(`source`, `endpoint`, `path`, `method`, `body`?, `options`?): `Promise`\<`Response`\>

Perform a fetch request.

#### Parameters

• **source**: `string`

The source for the request.

• **endpoint**: `string`

The base endpoint for the request.

• **path**: `string`

The path of the request.

• **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

The http method.

• **body?**: `string` \| `Uint8Array`

Request to send to the endpoint.

• **options?**: [`IFetchOptions`](../interfaces/IFetchOptions.md)

Options for sending the requests.

#### Returns

`Promise`\<`Response`\>

The response.

***

### fetchJson()

> `static` **fetchJson**\<`T`, `U`\>(`source`, `endpoint`, `path`, `method`, `requestData`?, `options`?): `Promise`\<`U`\>

Perform a request in json format.

#### Type parameters

• **T**

• **U**

#### Parameters

• **source**: `string`

The source for the request.

• **endpoint**: `string`

The base endpoint for the request.

• **path**: `string`

The path of the request.

• **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

The http method.

• **requestData?**: `T`

Request to send to the endpoint.

• **options?**: [`IFetchOptions`](../interfaces/IFetchOptions.md)

Options for sending the requests.

#### Returns

`Promise`\<`U`\>

The response.

***

### fetchBinary()

> `static` **fetchBinary**\<`T`\>(`source`, `endpoint`, `path`, `method`, `requestData`?, `options`?): `Promise`\<`Uint8Array` \| `T`\>

Perform a request for binary data.

#### Type parameters

• **T**

#### Parameters

• **source**: `string`

The source for the request.

• **endpoint**: `string`

The base endpoint for the request.

• **path**: `string`

The path of the request.

• **method**: `"GET"` \| `"POST"`

The http method.

• **requestData?**: `Uint8Array`

Request to send to the endpoint.

• **options?**: [`IFetchOptions`](../interfaces/IFetchOptions.md)

Options for sending the requests.

#### Returns

`Promise`\<`Uint8Array` \| `T`\>

The response.
