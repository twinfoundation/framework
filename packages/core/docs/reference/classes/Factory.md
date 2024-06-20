# Class: Factory\<T\>

Factory for creating implementation of generic types.

## Type parameters

• **T**

## Constructors

### new Factory()

> `private` **new Factory**\<`T`\>(`typeName`, `autoInstance`, `matcher`?): [`Factory`](Factory.md)\<`T`\>

Create a new instance of Factory, private use createFactory.

#### Parameters

• **typeName**: `string`

The type name for the instances.

• **autoInstance**: `boolean`= `false`

Automatically create an instance when registered.

• **matcher?**

Match the name of the instance.

#### Returns

[`Factory`](Factory.md)\<`T`\>

## Properties

### \_factories

> `static` `private` `readonly` **\_factories**: `object` = `{}`

Store all the created factories.

#### Index signature

 \[`typeName`: `string`\]: [`Factory`](Factory.md)\<`unknown`\>

## Methods

### createFactory()

> `static` **createFactory**\<`U`\>(`typeName`, `autoInstance`, `matcher`?): [`Factory`](Factory.md)\<`U`\>

Create a new factory, which is shared throughout all library instances.

#### Type parameters

• **U**

#### Parameters

• **typeName**: `string`

The type name for the instances.

• **autoInstance**: `boolean`= `false`

Automatically create an instance when registered.

• **matcher?**

Match the name of the instance.

#### Returns

[`Factory`](Factory.md)\<`U`\>

The factory instance.

***

### register()

> **register**\<`U`\>(`name`, `generator`): `void`

Register a new generator.

#### Type parameters

• **U**

#### Parameters

• **name**: `string`

The name of the generator.

• **generator**

The function to create an instance.

#### Returns

`void`

***

### unregister()

> **unregister**(`name`): `void`

Unregister a generator.

#### Parameters

• **name**: `string`

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

#### Type parameters

• **U**

#### Parameters

• **name**: `string`

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

#### Type parameters

• **U**

#### Parameters

• **name**: `string`

The name of the instance to generate.

#### Returns

`undefined` \| `U`

An instance of the item or undefined if it does not exist.

***

### reset()

> **reset**(): `void`

Reset all the instances.

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

### defaultMatcher()

> `private` **defaultMatcher**(`names`, `name`): `undefined` \| `string`

Match the requested name to the generator name.

#### Parameters

• **names**: `string`[]

The list of names for all the generators.

• **name**: `string`

The name to match.

#### Returns

`undefined` \| `string`

The matched name or undefined if no match.
