# Interface: IEntitySchema\<T\>

Definition for an entity schema.

## Type Parameters

### T

`T` = `unknown`

## Properties

### type

> **type**: `undefined` \| `string`

The type of the entity.

***

### options?

> `optional` **options**: [`IEntitySchemaOptions`](IEntitySchemaOptions.md)

The options for the entity.

***

### properties?

> `optional` **properties**: [`IEntitySchemaProperty`](IEntitySchemaProperty.md)\<`T`\>[]

The properties of the entity.
