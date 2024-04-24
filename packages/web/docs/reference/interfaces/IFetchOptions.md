# Interface: IFetchOptions

Options for call to the fetch helper.

## Properties

### headers

• `Optional` **headers**: [`IHttpRequestHeaders`](IHttpRequestHeaders.md)

**`Param`**

The headers for the request.

___

### includeCredentials

• `Optional` **includeCredentials**: `boolean`

Include credentials in the requests.

___

### retryCount

• `Optional` **retryCount**: `number`

The number of times to retry fetching defaults to no retries.

___

### retryDelayMs

• `Optional` **retryDelayMs**: `number`

The number of milliseconds we should delay before any retry.

___

### timeoutMs

• `Optional` **timeoutMs**: `number`

Timeout for requests in milliseconds.
