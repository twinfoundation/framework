# Interface: IEntityPropertyDescriptor\<T\>

Definition of an entity property.

## Type parameters

| Name |
| :--- |
| `T`  |

## Properties

### format

• `Optional` **format**: `string`

An additional hint for the format of the data.

#### Defined in

[models/IEntityPropertyDescriptor.ts:27](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L27)

---

### isPrimary

• `Optional` **isPrimary**: `boolean`

Is this the primary index property.

#### Defined in

[models/IEntityPropertyDescriptor.ts:37](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L37)

---

### isSecondary

• `Optional` **isSecondary**: `boolean`

Is this a secondary index property.

#### Defined in

[models/IEntityPropertyDescriptor.ts:42](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L42)

---

### itemType

• `Optional` **itemType**: `string`

The type of the item (only applies when type is either `list` or `structure`).

#### Defined in

[models/IEntityPropertyDescriptor.ts:22](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L22)

---

### name

• **name**: keyof `T`

The name of the property.

#### Defined in

[models/IEntityPropertyDescriptor.ts:12](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L12)

---

### optional

• `Optional` **optional**: `boolean`

Is the property optional.

#### Defined in

[models/IEntityPropertyDescriptor.ts:52](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L52)

---

### size

• `Optional` **size**: `number`

The length of the property if applicable.

#### Defined in

[models/IEntityPropertyDescriptor.ts:32](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L32)

---

### sortDirection

• `Optional` **sortDirection**: `"desc"` \| `"asc"`

Default sort direction for this column, leave empty if not sortable.

#### Defined in

[models/IEntityPropertyDescriptor.ts:47](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L47)

---

### type

• **type**: [`EntityPropertyDescriptorDataType`](../modules.md#entitypropertydescriptordatatype)

The type of the property.

#### Defined in

[models/IEntityPropertyDescriptor.ts:17](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IEntityPropertyDescriptor.ts#L17)
