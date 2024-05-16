# Interface: IDataTypeHandler

Interface describing a service which can handle a specific data type.

## Properties

### childTypes?

> `optional` **childTypes**: `object`

Define the types of any children.

#### Index signature

 \[`prop`: `string`\]: `string`

***

### defaultValue

> **defaultValue**: `unknown`

The default value for the item.

***

### isInternal

> **isInternal**: `boolean`

Is internal data type.

***

### type

> **type**: `string`

The type for the item.

## Methods

### validate()?

> `optional` **validate**(`propertyName`, `value`, `failures`, `container`?, `previousValue`?): `boolean`

A method for validating the data type.

#### Parameters

• **propertyName**: `string`

The name of the property being validated.

• **value**: `unknown`

The value to validate.

• **failures**: `IValidationFailure`[]

List of failures to add to.

• **container?**: `unknown`

The object which contains this one.

• **previousValue?**: `unknown`

The previous value of the object.

#### Returns

`boolean`

True if the item is valid.
