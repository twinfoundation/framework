# Interface: IEntitySort\<T\>

Definition of an entity property sort details.

## Type Parameters

### T

`T`

## Properties

### property

> **property**: keyof `T`

The name of the property.

***

### type

> **type**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the property.

***

### sortDirection

> **sortDirection**: [`SortDirection`](../type-aliases/SortDirection.md)

Default sort direction for this column, leave empty if not sortable.
