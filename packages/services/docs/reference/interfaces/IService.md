# Interface: IService

Interface describing a service.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the service.

## Methods

### bootstrap()?

> `optional` **bootstrap**(`systemPartitionId`): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### start()?

> `optional` **start**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop()?

> `optional` **stop**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.
