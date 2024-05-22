# Class: SchemaOrgDataTypes

Handle all the data types for schema.org.

## Constructors

### new SchemaOrgDataTypes()

> **new SchemaOrgDataTypes**(): [`SchemaOrgDataTypes`](SchemaOrgDataTypes.md)

#### Returns

[`SchemaOrgDataTypes`](SchemaOrgDataTypes.md)

## Properties

### TYPE\_TEXT

> `static` **TYPE\_TEXT**: `string` = `"https://schema.org/Text"`

Represents text storage.

***

### TYPE\_INTEGER

> `static` **TYPE\_INTEGER**: `string` = `"https://schema.org/Integer"`

Represents integer number values.

***

### TYPE\_FLOAT

> `static` **TYPE\_FLOAT**: `string` = `"https://schema.org/Float"`

Represents floating point numbers.

***

### TYPE\_BOOLEAN

> `static` **TYPE\_BOOLEAN**: `string` = `"https://schema.org/Boolean"`

Represents a boolean.

***

### TYPE\_URL

> `static` **TYPE\_URL**: `string` = `"https://schema.org/URL"`

Represents a url.

***

### TYPE\_DATE

> `static` **TYPE\_DATE**: `string` = `"https://schema.org/Date"`

Represents a date as an ISO format string.

***

### TYPE\_DATE\_TIME

> `static` **TYPE\_DATE\_TIME**: `string` = `"https://schema.org/DateTime"`

Represents a date time as an ISO format string.

***

### TYPE\_TIME

> `static` **TYPE\_TIME**: `string` = `"https://schema.org/Time"`

Represents a time as an ISO format string.

***

### TYPE\_IMAGE

> `static` **TYPE\_IMAGE**: `string` = `"https://schema.org/image"`

Represents a url which points to an image.

***

### TYPE\_GEO\_COORDINATES

> `static` **TYPE\_GEO\_COORDINATES**: `string` = `"https://schema.org/GeoCoordinates"`

Represents a location.

***

### TYPE\_STRUCTURED\_VALUE

> `static` **TYPE\_STRUCTURED\_VALUE**: `string` = `"https://schema.org/StructuredValue"`

Represents a structured value.

## Methods

### registerTypes()

> `static` **registerTypes**(): `void`

Register all the data types.

#### Returns

`void`

***

### validateGeoCoordinates()

> `static` **validateGeoCoordinates**(`propertyName`, `value`, `failures`): `value is GeoCoordinatesLeaf`

Validate if the property is valid geo-coordinates.

#### Parameters

• **propertyName**: `string`

The name of the property being validated.

• **value**: `unknown`

The value to test.

• **failures**: `IValidationFailure`[]

The list of failures to add to.

#### Returns

`value is GeoCoordinatesLeaf`

True if the value is geo-coordinates.
