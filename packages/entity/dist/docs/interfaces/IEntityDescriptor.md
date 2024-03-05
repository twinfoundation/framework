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

#### Defined in

[models/IEntityDescriptor.ts:18](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IEntityDescriptor.ts#L18)

___

### properties

• **properties**: [`IEntityPropertyDescriptor`](IEntityPropertyDescriptor.md)\<`T`\>[]

The properties.

#### Defined in

[models/IEntityDescriptor.ts:13](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IEntityDescriptor.ts#L13)

___

### structuredTypes

• `Optional` **structuredTypes**: [`IStructuredTypeDescriptor`](IStructuredTypeDescriptor.md)\<`any`\>[]

Structured types on which the entity depends on.

#### Defined in

[models/IEntityDescriptor.ts:24](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IEntityDescriptor.ts#L24)
