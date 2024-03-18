# Interface: IService

Interface describing a service.

## Methods

### bootstrap

▸ **bootstrap**(`requestContext`): `Promise`\<[`ILogEntry`](ILogEntry.md)[]\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | [`IRequestContext`](IRequestContext.md) | The request context for bootstrapping. |

#### Returns

`Promise`\<[`ILogEntry`](ILogEntry.md)[]\>

The response of the bootstrapping as log entries.

___

### start

▸ **start**(): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Returns

`Promise`\<`void`\>

Nothing.

___

### stop

▸ **stop**(): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Returns

`Promise`\<`void`\>

Nothing.
