# Interface: IIdentifierHandler

Interface describing a service which can handle a specific urn namespace.

## Properties

### namespace

> **namespace**: `string`

The namespace for the identifier.

## Methods

### validate()

> **validate**(`propertyName`, `value`, `failures`): `boolean`

A method for validating the identifier.

#### Parameters

• **propertyName**: `string`

The name of the property being validated.

• **value**: `unknown`

The value to validate.

• **failures**: `IValidationFailure`[]

List of failures to add to.

#### Returns

`boolean`

True if the item is valid.
