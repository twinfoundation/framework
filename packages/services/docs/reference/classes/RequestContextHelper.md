# Class: RequestContextHelper

Helper class for use with request contexts.

## Constructors

### new RequestContextHelper()

> **new RequestContextHelper**(): [`RequestContextHelper`](RequestContextHelper.md)

#### Returns

[`RequestContextHelper`](RequestContextHelper.md)

## Properties

### SYSTEM\_CONTEXT

> `static` `readonly` **SYSTEM\_CONTEXT**: [`IRequestContext`](../interfaces/IRequestContext.md) = `{}`

The system context has no tenant set.

## Methods

### removeTenant()

> `static` **removeTenant**(`requestContext`): [`IRequestContext`](../interfaces/IRequestContext.md)

Remove the tenant from the request context.

#### Parameters

• **requestContext**: [`IRequestContext`](../interfaces/IRequestContext.md)

The context to remove the tenant from.

#### Returns

[`IRequestContext`](../interfaces/IRequestContext.md)

The context with the tenant removed.
