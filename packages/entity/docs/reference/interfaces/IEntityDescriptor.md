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

### properties

• **properties**: [`IEntityPropertyDescriptor`](IEntityPropertyDescriptor.md)\<`T`\>[]

The properties.

___

### structuredTypes

• `Optional` **structuredTypes**: [`IStructuredTypeDescriptor`](IStructuredTypeDescriptor.md)\<`any`\>[]

Structured types on which the entity depends on.
