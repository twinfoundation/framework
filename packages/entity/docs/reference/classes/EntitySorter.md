# Class: EntitySorter

Class to perform sort operations on entities.

## Constructors

### Constructor

> **new EntitySorter**(): `EntitySorter`

#### Returns

`EntitySorter`

## Methods

### sort()

> `static` **sort**\<`T`\>(`entities`, `entitySorters?`): `T`[]

Sort a list of entities using multiple keys and direction.

#### Type Parameters

##### T

`T`

#### Parameters

##### entities

`T`[]

The list of entities.

##### entitySorters?

[`IEntitySort`](../interfaces/IEntitySort.md)\<`T`\>[]

The sort keys to use.

#### Returns

`T`[]

The sorted list.

***

### compare()

> `static` **compare**\<`T`\>(`entity1`, `entity2`, `prop`, `type`, `direction`): `number`

Compare two properties.

#### Type Parameters

##### T

`T`

#### Parameters

##### entity1

`T`

The first entity.

##### entity2

`T`

The second entity.

##### prop

keyof `T`

The property to compare.

##### type

[`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the property.

##### direction

[`SortDirection`](../type-aliases/SortDirection.md) = `SortDirection.Ascending`

The direction of the sort.

#### Returns

`number`

The result of the comparison.
