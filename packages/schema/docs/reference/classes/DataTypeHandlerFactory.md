# Class: DataTypeHandlerFactory

Factory for creating handlers for data types.

## Constructors

### constructor

• **new DataTypeHandlerFactory**(): [`DataTypeHandlerFactory`](DataTypeHandlerFactory.md)

#### Returns

[`DataTypeHandlerFactory`](DataTypeHandlerFactory.md)

## Methods

### dataTypes

▸ **dataTypes**(): [`IDataTypeHandler`](../interfaces/IDataTypeHandler.md)[]

Get all the dataTypes supported.

#### Returns

[`IDataTypeHandler`](../interfaces/IDataTypeHandler.md)[]

The list of supported data types.

___

### get

▸ **get**(`schema`): `undefined` \| [`IDataTypeHandler`](../interfaces/IDataTypeHandler.md)

Get a handler instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `string` | The schema of the instance to generate. |

#### Returns

`undefined` \| [`IDataTypeHandler`](../interfaces/IDataTypeHandler.md)

An instance of the service.

___

### register

▸ **register**(`dataType`): `void`

Register a new data type handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataType` | [`IDataTypeHandler`](../interfaces/IDataTypeHandler.md) | The function to create an instance. |

#### Returns

`void`

___

### unregister

▸ **unregister**(`type`): `void`

Unregister a data type handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | The type supported by the handler to unregister. |

#### Returns

`void`

**`Throws`**

GuardError if the parameters are invalid.

**`Throws`**

GeneralError if no service exists to unregister.
