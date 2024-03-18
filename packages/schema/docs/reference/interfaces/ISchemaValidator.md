# Interface: ISchemaValidator

Schema Validator interface.

## Hierarchy

- `IService`

  ↳ **`ISchemaValidator`**

## Implemented by

- [`SchemaValidationService`](../classes/SchemaValidationService.md)

## Methods

### bootstrap

▸ **bootstrap**(`requestContext`): `Promise`\<`ILogEntry`[]\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | The request context for bootstrapping. |

#### Returns

`Promise`\<`ILogEntry`[]\>

The response of the bootstrapping as log entries.

#### Inherited from

IService.bootstrap

___

### start

▸ **start**(): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

IService.start

___

### stop

▸ **stop**(): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

IService.stop

___

### validate

▸ **validate**(`data`, `schemaName`): `Promise`\<[`ISchemaValidationResult`](ISchemaValidationResult.md)\>

Validates data against a schema.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `unknown` | Data to be validated. |
| `schemaName` | `string` | Schema. |

#### Returns

`Promise`\<[`ISchemaValidationResult`](ISchemaValidationResult.md)\>

The validation result.
