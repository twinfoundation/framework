# Interface: IEntitySort\<T\>

Definition of an entity property sort details.

## Type parameters

• **T**

## Properties

### property

> **property**: keyof `T`

The name of the property.

***

### sortDirection

> **sortDirection**: [`SortDirection`](../enumerations/SortDirection.md)

Default sort direction for this column, leave empty if not sortable.

***

### type

> **type**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the property.
