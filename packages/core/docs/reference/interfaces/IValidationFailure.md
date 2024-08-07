# Interface: IValidationFailure

Interface describing the reason a validation failed.

## Properties

### property

> **property**: `string`

The property that failed validation.

***

### reason

> **reason**: `string`

The reason the validation failed as an i18 resource error.

***

### fieldName?

> `optional` **fieldName**: `string`

The optional human readable name for the field as an i18 resource.

***

### properties?

> `optional` **properties**: `object`

Additional properties for the validation failure.

#### Index signature

 \[`id`: `string`\]: `unknown`
