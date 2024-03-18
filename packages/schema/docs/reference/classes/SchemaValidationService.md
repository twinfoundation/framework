# Class: SchemaValidationService

A service for validating Schemas. Takes the schemas from the configuration.

## Implements

- [`ISchemaValidator`](../interfaces/ISchemaValidator.md)

## Constructors

### constructor

• **new SchemaValidationService**(`schemas`): [`SchemaValidationService`](SchemaValidationService.md)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schemas` | `Object` | The schemas to be loaded (defined at configuration). |

#### Returns

[`SchemaValidationService`](SchemaValidationService.md)

## Methods

### validate

▸ **validate**(`data`, `schemaName`): `Promise`\<[`ISchemaValidationResult`](../interfaces/ISchemaValidationResult.md)\>

Validates data against the Schema passed as parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `unknown` | The data to be validated. |
| `schemaName` | `string` | The name of the Schema. |

#### Returns

`Promise`\<[`ISchemaValidationResult`](../interfaces/ISchemaValidationResult.md)\>

True if validated false otherwise.

#### Implementation of

[ISchemaValidator](../interfaces/ISchemaValidator.md).[validate](../interfaces/ISchemaValidator.md#validate)
