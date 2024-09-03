# Class: FrameworkDataTypes

Handle all the framework data types.

## Constructors

### new FrameworkDataTypes()

> **new FrameworkDataTypes**(): [`FrameworkDataTypes`](FrameworkDataTypes.md)

#### Returns

[`FrameworkDataTypes`](FrameworkDataTypes.md)

## Properties

### TYPE\_URN

> `static` **TYPE\_URN**: `string` = `"URN"`

Represents a urn.

***

### TYPE\_TIMESTAMP\_MILLISECONDS

> `static` **TYPE\_TIMESTAMP\_MILLISECONDS**: `string` = `"TimestampMilliseconds"`

Represents a timestamp as an integer, milliseconds since 1 Jan 1970.

***

### TYPE\_TIMESTAMP\_SECONDS

> `static` **TYPE\_TIMESTAMP\_SECONDS**: `string` = `"TimestampSeconds"`

Represents a timestamp as an integer, seconds since 1 Jan 1970.

***

### TYPE\_PROPERTY

> `static` **TYPE\_PROPERTY**: `string` = `"Property"`

Represents a property.

***

### TYPE\_PROPERTY\_LIST

> `static` **TYPE\_PROPERTY\_LIST**: `string` = `"PropertyList"`

Represents a property list.

## Methods

### registerTypes()

> `static` **registerTypes**(): `void`

Register all the data types.

#### Returns

`void`

***

### validateIPropertyList()

> `static` **validateIPropertyList**(`propertyName`, `value`, `failures`, `container`?): `boolean`

Validator for an IProperty list.

#### Parameters

• **propertyName**: `string`

The name of the property being validated.

• **value**: [`IProperty`](../interfaces/IProperty.md)[]

The value to test.

• **failures**: `IValidationFailure`[]

The list of failures to add to.

• **container?**: `unknown`

The object which contains this one.

#### Returns

`boolean`

True if the value is a valid property list.

***

### validateIProperty()

> `static` **validateIProperty**(`propertyName`, `value`, `failures`, `container`?): `boolean`

Validator for an IProperty.

#### Parameters

• **propertyName**: `string`

The name of the property being validated.

• **value**: [`IProperty`](../interfaces/IProperty.md)

The value to test.

• **failures**: `IValidationFailure`[]

The list of failures to add to.

• **container?**: `unknown`

The object which contains this one.

#### Returns

`boolean`

True if the value is a valid property.
