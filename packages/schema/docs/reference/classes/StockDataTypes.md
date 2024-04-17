# Class: StockDataTypes

Handle all the stock data types.

## Constructors

### constructor

• **new StockDataTypes**(): [`StockDataTypes`](StockDataTypes.md)

#### Returns

[`StockDataTypes`](StockDataTypes.md)

## Properties

### TYPE\_PROPERTY

▪ `Static` **TYPE\_PROPERTY**: `string` = `"Property"`

Represents a property.

___

### TYPE\_PROPERTY\_LIST

▪ `Static` **TYPE\_PROPERTY\_LIST**: `string` = `"PropertyList"`

Represents a property list.

___

### TYPE\_TIMESTAMP\_MILLISECONDS

▪ `Static` **TYPE\_TIMESTAMP\_MILLISECONDS**: `string` = `"TimestampMilliseconds"`

Represents a timestamp as an integer, milliseconds since 1 Jan 1970.

___

### TYPE\_TIMESTAMP\_SECONDS

▪ `Static` **TYPE\_TIMESTAMP\_SECONDS**: `string` = `"TimestampSeconds"`

Represents a timestamp as an integer, seconds since 1 Jan 1970.

___

### TYPE\_URN

▪ `Static` **TYPE\_URN**: `string` = `"URN"`

Represents a urn.

## Methods

### registerTypes

▸ **registerTypes**(): `void`

Register all the data types.

#### Returns

`void`

___

### validateIProperty

▸ **validateIProperty**(`propertyName`, `value`, `failures`, `container?`, `previousValue?`): `boolean`

Validator for an IProperty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `string` | The name of the property being validated. |
| `value` | [`IProperty`](../interfaces/IProperty.md) | The value to test. |
| `failures` | `IValidationFailure`[] | The list of failures to add to. |
| `container?` | `unknown` | The object which contains this one. |
| `previousValue?` | [`IProperty`](../interfaces/IProperty.md) | The previous value of the object. |

#### Returns

`boolean`

True if the value is a valid property.

___

### validateIPropertyList

▸ **validateIPropertyList**(`propertyName`, `value`, `failures`, `container?`, `previousValue?`): `boolean`

Validator for an IProperty list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `string` | The name of the property being validated. |
| `value` | [`IProperty`](../interfaces/IProperty.md)[] | The value to test. |
| `failures` | `IValidationFailure`[] | The list of failures to add to. |
| `container?` | `unknown` | The object which contains this one. |
| `previousValue?` | [`IProperty`](../interfaces/IProperty.md)[] | The previous value of the object. |

#### Returns

`boolean`

True if the value is a valid property list.
