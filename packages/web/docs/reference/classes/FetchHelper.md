# Class: FetchHelper

Class to helper with fetch operations.

## Constructors

### new FetchHelper()

> **new FetchHelper**(): [`FetchHelper`](FetchHelper.md)

#### Returns

[`FetchHelper`](FetchHelper.md)

## Methods

### fetch()

> `static` **fetch**(`source`, `url`, `method`, `body`?, `options`?): `Promise`\<`Response`\>

Perform a fetch request.

#### Parameters

##### source

`string`

The source for the request.

##### url

`string`

The url for the request.

##### method

[`HttpMethod`](../type-aliases/HttpMethod.md)

The http method.

##### body?

Request to send to the endpoint.

`string` | `Uint8Array`

##### options?

`Omit`\<[`IFetchOptions`](../interfaces/IFetchOptions.md), `"cacheTtlSeconds"`\>

Options for sending the requests.

#### Returns

`Promise`\<`Response`\>

The response.

***

### fetchJson()

> `static` **fetchJson**\<`T`, `U`\>(`source`, `url`, `method`, `requestData`?, `options`?): `Promise`\<`U`\>

Perform a request in json format.

#### Type Parameters

• **T**

• **U**

#### Parameters

##### source

`string`

The source for the request.

##### url

`string`

The url for the request.

##### method

[`HttpMethod`](../type-aliases/HttpMethod.md)

The http method.

##### requestData?

`T`

Request to send to the endpoint.

##### options?

[`IFetchOptions`](../interfaces/IFetchOptions.md)

Options for sending the requests.

#### Returns

`Promise`\<`U`\>

The response.

***

### fetchBinary()

> `static` **fetchBinary**\<`T`\>(`source`, `url`, `method`, `requestData`?, `options`?): `Promise`\<`Uint8Array` \| `T`\>

Perform a request for binary data.

#### Type Parameters

• **T**

#### Parameters

##### source

`string`

The source for the request.

##### url

`string`

The url for the request.

##### method

The http method.

`"GET"` | `"POST"`

##### requestData?

`Uint8Array`

Request to send to the endpoint.

##### options?

[`IFetchOptions`](../interfaces/IFetchOptions.md)

Options for sending the requests.

#### Returns

`Promise`\<`Uint8Array` \| `T`\>

The response.

***

### clearCache()

> `static` **clearCache**(): `void`

Clears the cache.

#### Returns

`void`

***

### getCacheEntry()

> `static` **getCacheEntry**\<`T`\>(`url`): `Promise`\<`undefined` \| `T`\>

Get a cache entry.

#### Type Parameters

• **T**

#### Parameters

##### url

`string`

The url for the request.

#### Returns

`Promise`\<`undefined` \| `T`\>

The cache entry if it exists.

***

### removeCacheEntry()

> `static` **removeCacheEntry**(`url`): `void`

Remove a cache entry.

#### Parameters

##### url

`string`

The url for the request.

#### Returns

`void`
