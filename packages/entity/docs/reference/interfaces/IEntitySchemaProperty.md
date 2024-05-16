# Interface: IEntitySchemaProperty\<T\>

Definition for an entity schema property.

## Type parameters

• **T** = `unknown`

## Properties

### description?

> `optional` **description**: `string`

Description of the object.

***

### examples?

> `optional` **examples**: `unknown`[]

Examples of the property values.

***

### isPrimary?

> `optional` **isPrimary**: `boolean`

Is this the primary index property.

***

### isSecondary?

> `optional` **isSecondary**: `boolean`

Is this a secondary index property.

***

### itemType?

> `optional` **itemType**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the item (only applies when type is `array`).

***

### itemTypeRef?

> `optional` **itemTypeRef**: `string`

The type ref of the item (only applies when type is either `array` or `object`).

***

### optional?

> `optional` **optional**: `boolean`

Is the property optional.

***

### property

> **property**: keyof `T`

The property name from the entity.

***

### sortDirection?

> `optional` **sortDirection**: [`SortDirection`](../enumerations/SortDirection.md)

Default sort direction for this field, leave empty if not sortable.

***

### type

> **type**: [`EntitySchemaPropertyType`](../type-aliases/EntitySchemaPropertyType.md)

The type of the property.
