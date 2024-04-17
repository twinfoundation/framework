# Class: SchemaOrgDataTypes

Handle all the data types for schema.org.

## Constructors

### constructor

• **new SchemaOrgDataTypes**(): [`SchemaOrgDataTypes`](SchemaOrgDataTypes.md)

#### Returns

[`SchemaOrgDataTypes`](SchemaOrgDataTypes.md)

## Properties

### TYPE\_BOOLEAN

▪ `Static` **TYPE\_BOOLEAN**: `string` = `"https://schema.org/Boolean"`

Represents a boolean.

___

### TYPE\_DATE

▪ `Static` **TYPE\_DATE**: `string` = `"https://schema.org/Date"`

Represents a date as an ISO format string.

___

### TYPE\_DATE\_TIME

▪ `Static` **TYPE\_DATE\_TIME**: `string` = `"https://schema.org/DateTime"`

Represents a date time as an ISO format string.

___

### TYPE\_FLOAT

▪ `Static` **TYPE\_FLOAT**: `string` = `"https://schema.org/Float"`

Represents floating point numbers.

___

### TYPE\_GEO\_COORDINATES

▪ `Static` **TYPE\_GEO\_COORDINATES**: `string` = `"https://schema.org/GeoCoordinates"`

Represents a location.

___

### TYPE\_IMAGE

▪ `Static` **TYPE\_IMAGE**: `string` = `"https://schema.org/image"`

Represents a url which points to an image.

___

### TYPE\_INTEGER

▪ `Static` **TYPE\_INTEGER**: `string` = `"https://schema.org/Integer"`

Represents integer number values.

___

### TYPE\_STRUCTURED\_VALUE

▪ `Static` **TYPE\_STRUCTURED\_VALUE**: `string` = `"https://schema.org/StructuredValue"`

Represents a structured value.

___

### TYPE\_TEXT

▪ `Static` **TYPE\_TEXT**: `string` = `"https://schema.org/Text"`

Represents text storage.

___

### TYPE\_TIME

▪ `Static` **TYPE\_TIME**: `string` = `"https://schema.org/Time"`

Represents a time as an ISO format string.

___

### TYPE\_URL

▪ `Static` **TYPE\_URL**: `string` = `"https://schema.org/URL"`

Represents a url.

## Methods

### registerTypes

▸ **registerTypes**(): `void`

Register all the data types.

#### Returns

`void`

___

### validateGeoCoordinates

▸ **validateGeoCoordinates**(`propertyName`, `value`, `failures`): value is GeoCoordinatesLeaf

Validate if the property is valid geo-coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `string` | The name of the property being validated. |
| `value` | `unknown` | The value to test. |
| `failures` | `IValidationFailure`[] | The list of failures to add to. |

#### Returns

value is GeoCoordinatesLeaf

True if the value is geo-coordinates.
