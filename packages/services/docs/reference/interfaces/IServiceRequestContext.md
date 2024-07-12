# Interface: IServiceRequestContext

The context for the request used by a service.

## Properties

### partitionId?

> `optional` **partitionId**: `string`

The id for partitioning data, usually correlated from the api key making the request.

***

### identity?

> `optional` **identity**: `string`

The identity of the requestor if there is an authenticated user.
