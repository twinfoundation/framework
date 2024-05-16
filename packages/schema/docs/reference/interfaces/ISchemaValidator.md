# Interface: ISchemaValidator

Schema Validator interface.

## Methods

### validate()

> **validate**(`data`, `schemaName`): `Promise`\<[`ISchemaValidationResult`](ISchemaValidationResult.md)\>

Validates data against a schema.

#### Parameters

• **data**: `unknown`

Data to be validated.

• **schemaName**: `string`

Schema.

#### Returns

`Promise`\<[`ISchemaValidationResult`](ISchemaValidationResult.md)\>

The validation result.
