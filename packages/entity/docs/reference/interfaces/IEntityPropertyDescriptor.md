# Interface: IEntityPropertyDescriptor\<T\>

Definition of an entity property.

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### format

• `Optional` **format**: `string`

An additional hint for the format of the data.

___

### isPrimary

• `Optional` **isPrimary**: `boolean`

Is this the primary index property.

___

### isSecondary

• `Optional` **isSecondary**: `boolean`

Is this a secondary index property.

___

### itemType

• `Optional` **itemType**: `string`

The type of the item (only applies when type is either `list` or `structure`).

___

### name

• **name**: keyof `T`

The name of the property.

___

### optional

• `Optional` **optional**: `boolean`

Is the property optional.

___

### size

• `Optional` **size**: `number`

The length of the property if applicable.

___

### sortDirection

• `Optional` **sortDirection**: ``"desc"`` \| ``"asc"``

Default sort direction for this column, leave empty if not sortable.

___

### type

• **type**: [`EntityPropertyDescriptorDataType`](../modules.md#entitypropertydescriptordatatype)

The type of the property.
