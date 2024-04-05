# Class: Factory\<T\>

Factory for creating implementation of generic types.

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new Factory**\<`T`\>(`typeName`, `autoInstance?`, `matcher?`): [`Factory`](Factory.md)\<`T`\>

Create a new instance of Factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `typeName` | `string` | `undefined` | The type name for the instances. |
| `autoInstance` | `boolean` | `false` | Automatically create an instance when registered. |
| `matcher?` | (`names`: `string`[], `name`: `string`) => `undefined` \| `string` | `undefined` | Match the name of the instance. |

#### Returns

[`Factory`](Factory.md)\<`T`\>

## Methods

### defaultMatcher

▸ **defaultMatcher**(`names`, `name`): `undefined` \| `string`

Match the requested name to the generator name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `names` | `string`[] | The list of names for all the generators. |
| `name` | `string` | The name to match. |

#### Returns

`undefined` \| `string`

The matched name or undefined if no match.

___

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

### instancesList

▸ **instancesList**(): `T`[]

Get all the instances as a list in the order they were registered.

#### Returns

`T`[]

The instances as a list in the order they were registered.

___

### instancesMap

▸ **instancesMap**(): `Object`

Get all the instances as a map.

#### Returns

`Object`

The instances as a map.

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
