# Interface: IService

Interface describing a service.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the service.

## Methods

### bootstrap()?

> `optional` **bootstrap**(`systemRequestContext`): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemRequestContext**: [`IServiceRequestContext`](IServiceRequestContext.md)

The system request context.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### start()?

> `optional` **start**(`systemRequestContext`): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemRequestContext**: [`IServiceRequestContext`](IServiceRequestContext.md)

The system request context.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop()?

> `optional` **stop**(`systemRequestContext`): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemRequestContext**: [`IServiceRequestContext`](IServiceRequestContext.md)

The system request context.

#### Returns

`Promise`\<`void`\>

Nothing.
