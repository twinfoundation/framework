# Class: JsonSchemaValidator

A validator for JSON schemas.

## Constructors

### new JsonSchemaValidator()

> **new JsonSchemaValidator**(): [`JsonSchemaValidator`](JsonSchemaValidator.md)

#### Returns

[`JsonSchemaValidator`](JsonSchemaValidator.md)

## Methods

### validate()

> `static` **validate**\<`T`\>(`schema`, `data`): `Promise`\<[`ISchemaValidationResult`](../interfaces/ISchemaValidationResult.md)\>

Validates data against the schema.

#### Type parameters

• **T** = `unknown`

#### Parameters

• **schema**: `JSONSchema7`

The schema to validate the data with.

• **data**: `T`

The data to be validated.

#### Returns

`Promise`\<[`ISchemaValidationResult`](../interfaces/ISchemaValidationResult.md)\>

Result containing errors if there are any.
