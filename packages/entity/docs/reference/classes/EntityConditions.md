# Class: EntityConditions

Class to perform condition checks.

## Constructors

### Constructor

> **new EntityConditions**(): `EntityConditions`

#### Returns

`EntityConditions`

## Methods

### check()

> `static` **check**\<`T`\>(`entity`, `condition?`): `boolean`

See if the entity matches the conditions.

#### Type Parameters

##### T

`T`

#### Parameters

##### entity

`T`

The entity to test.

##### condition?

[`EntityCondition`](../type-aliases/EntityCondition.md)\<`T`\>

The conditions to test.

#### Returns

`boolean`

True if the entity matches.

***

### compare()

> `static` **compare**\<`T`\>(`entity`, `comparator`): `boolean`

See if the entity matches the conditions.

#### Type Parameters

##### T

`T`

#### Parameters

##### entity

`T`

The entity to test.

##### comparator

[`IComparator`](../interfaces/IComparator.md)

The condition to test.

#### Returns

`boolean`

True if the entity matches.
