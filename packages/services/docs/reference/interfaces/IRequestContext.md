# Interface: IRequestContext

The context for the request.

## Properties

### identity?

> `optional` **identity**: `string`

The identity of the requestor if there is an authenticated user.

***

### locale?

> `optional` **locale**: `string`

The locale of the context as a code e.g. es-ES, defaults to en.

***

### tenantId?

> `optional` **tenantId**: `string`

The tenant id for partitioning data, correlated from the api key making the request.
