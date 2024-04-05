# Class: Factory\<T\>

Factory for creating implementation of generic types.

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new Factory**\<`T`\>(`typeName`): [`Factory`](Factory.md)\<`T`\>

Create a new instance of Factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typeName` | `string` | The type name for the instances. |

#### Returns

[`Factory`](Factory.md)\<`T`\>

## Methods

### get

▸ **get**\<`U`\>(`name`): `U`

Get a generator instance.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the instance to generate. |

#### Returns

`U`

An instance of the item.

**`Throws`**

GuardError if the parameters are invalid.

**`Throws`**

GeneralError if no item exists to get.

___

### getIfExists

▸ **getIfExists**\<`U`\>(`name`): `undefined` \| `U`

Get a generator instance with no exceptions.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the instance to generate. |

#### Returns

`undefined` \| `U`

An instance of the item or undefined if it does not exist.

___

### instances

▸ **instances**(): `Object`

Get all the instances.

#### Returns

`Object`

The instances.

___

### names

▸ **names**(): `string`[]

Get all the generator names in the order they were registered.

#### Returns

`string`[]

The ordered generator names.

___

### register

▸ **register**\<`U`\>(`name`, `generator`): `void`

Register a new generator.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the generator. |
| `generator` | () => `U` | The function to create an instance. |

#### Returns

`void`

___

### reset

▸ **reset**(): `void`

Reset all the instances.

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

GeneralError if no generator exists.
