# Class: Factory\<T\>

Factory for creating implementation of generic types.

## Type Parameters

### T

`T`

## Methods

### createFactory()

> `static` **createFactory**\<`U`\>(`typeName`, `autoInstance`, `matcher?`): `Factory`\<`U`\>

Create a new factory, which is shared throughout all library instances.

#### Type Parameters

##### U

`U`

#### Parameters

##### typeName

`string`

The type name for the instances.

##### autoInstance

`boolean` = `false`

Automatically create an instance when registered.

##### matcher?

(`names`, `name`) => `undefined` \| `string`

Match the name of the instance.

#### Returns

`Factory`\<`U`\>

The factory instance.

***

### getFactories()

> `static` **getFactories**(): `object`

Get all the factories.

#### Returns

`object`

All the factories.

***

### resetFactories()

> `static` **resetFactories**(): `void`

Reset all the factories, which removes any created instances, but not the registrations.

#### Returns

`void`

***

### clearFactories()

> `static` **clearFactories**(): `void`

Clear all the factories, which removes anything registered with the factories.

#### Returns

`void`

***

### register()

> **register**\<`U`\>(`name`, `generator`): `void`

Register a new generator.

#### Type Parameters

##### U

`U`

#### Parameters

##### name

`string`

The name of the generator.

##### generator

() => `U`

The function to create an instance.

#### Returns

`void`

***

### unregister()

> **unregister**(`name`): `void`

Unregister a generator.

#### Parameters

##### name

`string`

The name of the generator to unregister.

#### Returns

`void`

#### Throws

GuardError if the parameters are invalid.

#### Throws

GeneralError if no generator exists.

***

### get()

> **get**\<`U`\>(`name`): `U`

Get a generator instance.

#### Type Parameters

##### U

`U`

#### Parameters

##### name

`string`

The name of the instance to generate.

#### Returns

`U`

An instance of the item.

#### Throws

GuardError if the parameters are invalid.

#### Throws

GeneralError if no item exists to get.

***

### getIfExists()

> **getIfExists**\<`U`\>(`name`): `undefined` \| `U`

Get a generator instance with no exceptions.

#### Type Parameters

##### U

`U`

#### Parameters

##### name

`string`

The name of the instance to generate.

#### Returns

`undefined` \| `U`

An instance of the item or undefined if it does not exist.

***

### reset()

> **reset**(): `void`

Remove all the instances and leave the generators intact.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Remove all the instances and the generators.

#### Returns

`void`

***

### instancesMap()

> **instancesMap**(): `object`

Get all the instances as a map.

#### Returns

`object`

The instances as a map.

***

### instancesList()

> **instancesList**(): `T`[]

Get all the instances as a list in the order they were registered.

#### Returns

`T`[]

The instances as a list in the order they were registered.

***

### names()

> **names**(): `string`[]

Get all the generator names in the order they were registered.

#### Returns

`string`[]

The ordered generator names.

***

### hasName()

> **hasName**(`name`): `boolean`

Does the factory contain the name.

#### Parameters

##### name

`string`

The name of the instance to find.

#### Returns

`boolean`

True if the factory has a matching name.
