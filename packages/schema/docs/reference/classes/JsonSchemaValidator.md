# Class: JsonSchemaValidator

A validator for JSON schemas.

## Implements

- [`ISchemaValidator`](../interfaces/ISchemaValidator.md)

## Constructors

### new JsonSchemaValidator()

> **new JsonSchemaValidator**(`schemas`): [`JsonSchemaValidator`](JsonSchemaValidator.md)

The constructor.

#### Parameters

• **schemas**

The schemas to be loaded.

#### Returns

[`JsonSchemaValidator`](JsonSchemaValidator.md)

## Methods

### validate()

> **validate**(`schemaName`, `data`): `Promise`\<[`ISchemaValidationResult`](../interfaces/ISchemaValidationResult.md)\>

Validates data against the Schema passed as parameter.

#### Parameters

• **schemaName**: `string`

The name of the Schema.

• **data**: `unknown`

The data to be validated.

#### Returns

`Promise`\<[`ISchemaValidationResult`](../interfaces/ISchemaValidationResult.md)\>

True if validated false otherwise.

#### Implementation of

[`ISchemaValidator`](../interfaces/ISchemaValidator.md).[`validate`](../interfaces/ISchemaValidator.md#validate)
