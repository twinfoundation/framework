# Class: SharedStore

Provide a store for shared objects which can be accesses through multiple
instance loads of a packages.

## Constructors

### Constructor

> **new SharedStore**(): `SharedStore`

#### Returns

`SharedStore`

## Methods

### get()

> `static` **get**\<`T`\>(`prop`): `undefined` \| `T`

Get a property from the shared store.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### prop

`string`

The name of the property to get.

#### Returns

`undefined` \| `T`

The property if it exists.

***

### set()

> `static` **set**\<`T`\>(`prop`, `value`): `void`

Set the property in the shared store.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### prop

`string`

The name of the property to set.

##### value

`T`

The value to set.

#### Returns

`void`

***

### remove()

> `static` **remove**(`prop`): `void`

Remove a property from the shared store.

#### Parameters

##### prop

`string`

The name of the property to remove.

#### Returns

`void`
