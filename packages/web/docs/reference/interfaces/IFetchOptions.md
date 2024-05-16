# Interface: IFetchOptions

Options for call to the fetch helper.

## Properties

### headers?

> `optional` **headers**: [`IHttpRequestHeaders`](IHttpRequestHeaders.md)

#### Param

The headers for the request.

***

### includeCredentials?

> `optional` **includeCredentials**: `boolean`

Include credentials in the requests.

***

### retryCount?

> `optional` **retryCount**: `number`

The number of times to retry fetching defaults to no retries.

***

### retryDelayMs?

> `optional` **retryDelayMs**: `number`

The number of milliseconds we should delay before any retry.

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Timeout for requests in milliseconds.
