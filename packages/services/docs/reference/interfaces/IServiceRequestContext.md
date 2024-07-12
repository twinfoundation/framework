# Interface: IServiceRequestContext

The context for the request used by a service.

## Extends

- [`IBaseRequestContext`](IBaseRequestContext.md)

## Properties

### locale?

> `optional` **locale**: `string`

The locale of the context as a code e.g. es-ES, defaults to en.

#### Inherited from

[`IBaseRequestContext`](IBaseRequestContext.md).[`locale`](IBaseRequestContext.md#locale)

***

### partitionId?

> `optional` **partitionId**: `string`

The id for partitioning data, usually correlated from the api key making the request.

***

### identity?

> `optional` **identity**: `string`

The identity of the requestor if there is an authenticated user.
