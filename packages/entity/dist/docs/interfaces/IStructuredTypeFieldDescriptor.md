# Interface: IStructuredTypeFieldDescriptor\<T\>

Definition of an entity field.

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### itemType

• `Optional` **itemType**: `string`

The type of the item (only applies when type is either `list` or `structure`).

#### Defined in

[models/IStructuredTypeFieldDescriptor.ts:22](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IStructuredTypeFieldDescriptor.ts#L22)

___

### name

• **name**: keyof `T`

The name of the field it has to correspond to one of the properties of the bound type T.

#### Defined in

[models/IStructuredTypeFieldDescriptor.ts:12](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IStructuredTypeFieldDescriptor.ts#L12)

___

### size

• `Optional` **size**: `number`

The length of the property if applicable.

#### Defined in

[models/IStructuredTypeFieldDescriptor.ts:27](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IStructuredTypeFieldDescriptor.ts#L27)

___

### type

• **type**: [`EntityPropertyDescriptorDataType`](../modules.md#entitypropertydescriptordatatype)

The type of the field.

#### Defined in

[models/IStructuredTypeFieldDescriptor.ts:17](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IStructuredTypeFieldDescriptor.ts#L17)
