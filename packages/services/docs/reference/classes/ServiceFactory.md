# Class: ServiceFactory

Factory for creating implementation of service types.

## Constructors

### constructor

• **new ServiceFactory**(): [`ServiceFactory`](ServiceFactory.md)

#### Returns

[`ServiceFactory`](ServiceFactory.md)

## Methods

### get

▸ **get**\<`T`\>(`name`): `T`

Get a generator instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IService`](../interfaces/IService.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the instance to generate. |

#### Returns

`T`

An instance of the service.

**`Throws`**

GuardError if the parameters are invalid.

**`Throws`**

GeneralError if no service exists to get.

___

### getIfExists

▸ **getIfExists**\<`T`\>(`name`): `undefined` \| `T`

Get a generator instance with no exceptions.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IService`](../interfaces/IService.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the instance to generate. |

#### Returns

`undefined` \| `T`

An instance of the service or undefined if it does not exist.

___

### instances

▸ **instances**(): `Object`

Get all the service instances.

#### Returns

`Object`

The service instances.

___

### names

▸ **names**(): `string`[]

Get all the service names in the order they were registered.

#### Returns

`string`[]

The ordered service names.

___

### register

▸ **register**(`name`, `generator`): `void`

Register a new generator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the generator. |
| `generator` | () => `unknown` | The function to create an instance. |

#### Returns

`void`

___

### reset

▸ **reset**(): `void`

Reset all the service instances.

#### Returns

`void`

___

### unregister

▸ **unregister**(`name`): `void`

Unregister a generator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the generator to unregister. |

#### Returns

`void`

**`Throws`**

GuardError if the parameters are invalid.

**`Throws`**

GeneralError if no service exists.
