# Interface: IDataTypeHandler

Interface describing a type which can handle a specific data type.

## Properties

### isInternal

> **isInternal**: `boolean`

Is internal data type.

***

### type

> **type**: `string`

The type for the item.

***

### defaultValue

> **defaultValue**: `unknown`

The default value for the item.

***

### childTypes?

> `optional` **childTypes**: `object`

Define the types of any children.

#### Index signature

 \[`prop`: `string`\]: `string`

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
