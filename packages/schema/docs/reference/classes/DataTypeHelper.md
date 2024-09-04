# Class: DataTypeHelper

Class to help with data types.

## Constructors

### new DataTypeHelper()

> **new DataTypeHelper**(): [`DataTypeHelper`](DataTypeHelper.md)

#### Returns

[`DataTypeHelper`](DataTypeHelper.md)

## Methods

### validate()

> `static` **validate**(`propertyName`, `dataType`, `data`, `validationFailures`, `validationMode`?): `Promise`\<`boolean`\>

Validate a data type.

#### Parameters

• **propertyName**: `string`

The property name to validate.

• **dataType**: `undefined` \| `string`

The data type to validate.

• **data**: `unknown`

The data to validate.

• **validationFailures**: `IValidationFailure`[]

The list of validation failures to add to.

• **validationMode?**: `"schema"` \| `"validate"` \| `"either"`

The validation mode to use, defaults to either.

#### Returns

`Promise`\<`boolean`\>

True if the data was valid.
