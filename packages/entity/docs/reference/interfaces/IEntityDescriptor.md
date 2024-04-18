# Interface: IEntityDescriptor\<T\>

Definition of an entity field.

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### hasDynamicProperties

• `Optional` **hasDynamicProperties**: `boolean`

Does the entity contain dynamic unknown properties.

___

### name

• **name**: `string`

The name of the entity type that the descriptor is for.

___

### properties

• **properties**: [`IEntityPropertyDescriptor`](IEntityPropertyDescriptor.md)\<`T`\>[]

The properties.
