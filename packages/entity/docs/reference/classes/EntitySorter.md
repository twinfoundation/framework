# Class: EntitySorter

Class to perform sort operations on entities.

## Constructors

### new EntitySorter()

> **new EntitySorter**(): [`EntitySorter`](EntitySorter.md)

#### Returns

[`EntitySorter`](EntitySorter.md)

## Methods

### sort()

> `static` **sort**\<`T`\>(`entities`, `entitySorters`?): `T`[]

Sort a list of entities using multiple keys and direction.

#### Type parameters

• **T**

#### Parameters

• **entities**: `T`[]

The list of entities.

• **entitySorters?**: [`IEntitySort`](../interfaces/IEntitySort.md)\<`T`\>[]

The sort keys to use.

#### Returns

`T`[]

The sorted list.

***

### compare()

> `static` **compare**\<`T`\>(`entity1`, `entity2`, `prop`, `type`, `direction`): `number`

Compare two properties.

#### Type parameters

• **T**

#### Parameters

• **entity1**: `T`

The first entity.

• **entity2**: `T`

The second entity.

• **prop**: keyof `T`

The property to compare.

• **type**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the property.

• **direction**: [`SortDirection`](../enumerations/SortDirection.md)= `SortDirection.Ascending`

The direction of the sort.

#### Returns

`number`

The result of the comparison.
