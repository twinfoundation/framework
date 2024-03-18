# Class: IdentifierHandlerFactory

Factory for creating handlers for identifiers.

## Constructors

### constructor

• **new IdentifierHandlerFactory**(): [`IdentifierHandlerFactory`](IdentifierHandlerFactory.md)

#### Returns

[`IdentifierHandlerFactory`](IdentifierHandlerFactory.md)

## Methods

### get

▸ **get**(`uri`): `undefined` \| [`IIdentifierHandler`](../interfaces/IIdentifierHandler.md)

Get a handler instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | `string` | Breakdown a uri to see if we can find a matching handler. |

#### Returns

`undefined` \| [`IIdentifierHandler`](../interfaces/IIdentifierHandler.md)

An instance of the service.

___

### namespaces

▸ **namespaces**(): [`IIdentifierHandler`](../interfaces/IIdentifierHandler.md)[]

Get all the namespaces supported.

#### Returns

[`IIdentifierHandler`](../interfaces/IIdentifierHandler.md)[]

The list of supported namespaces.

___

### register

▸ **register**(`identifier`): `void`

Register a new identifier handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [`IIdentifierHandler`](../interfaces/IIdentifierHandler.md) | The function to create an instance. |

#### Returns

`void`

___

### unregister

▸ **unregister**(`type`): `void`

Unregister a identifier handler.

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
