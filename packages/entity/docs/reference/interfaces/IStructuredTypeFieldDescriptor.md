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

___

### name

• **name**: keyof `T`

The name of the field it has to correspond to one of the properties of the bound type T.

___

### size

• `Optional` **size**: `number`

The length of the property if applicable.

___

### type

• **type**: [`EntityPropertyDescriptorDataType`](../modules.md#entitypropertydescriptordatatype)

The type of the field.
