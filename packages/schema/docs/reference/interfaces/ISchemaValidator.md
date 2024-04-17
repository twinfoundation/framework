# Interface: ISchemaValidator

Schema Validator interface.

## Implemented by

- [`JsonSchemaValidator`](../classes/JsonSchemaValidator.md)

## Methods

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
