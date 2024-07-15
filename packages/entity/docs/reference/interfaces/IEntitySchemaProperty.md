# Interface: IEntitySchemaProperty\<T\>

Definition for an entity schema property.

## Type parameters

• **T** = `unknown`

## Properties

### property

> **property**: keyof `T`

The property name from the entity.

***

### type

> **type**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the property.

***

### isPrimary?

> `optional` **isPrimary**: `boolean`

Is this the primary index property.

***

### isSecondary?

> `optional` **isSecondary**: `boolean`

Is this a secondary index property.

***

### sortDirection?

> `optional` **sortDirection**: [`SortDirection`](../type-aliases/SortDirection.md)

Default sort direction for this field, leave empty if not sortable.

***

### optional?

> `optional` **optional**: `boolean`

Is the property optional.

***

### itemType?

> `optional` **itemType**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the item (only applies when type is `array`).

***

### itemTypeRef?

> `optional` **itemTypeRef**: `string`

The type ref of the item (only applies when type is either `array` or `object`).

***

### description?

> `optional` **description**: `string`

Description of the object.

***

### examples?

> `optional` **examples**: `unknown`[]

Examples of the property values.
