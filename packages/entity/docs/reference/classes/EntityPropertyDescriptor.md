# Class: EntityPropertyDescriptor

Class to perform sort operations.

## Constructors

### constructor

• **new EntityPropertyDescriptor**(): [`EntityPropertyDescriptor`](EntityPropertyDescriptor.md)

#### Returns

[`EntityPropertyDescriptor`](EntityPropertyDescriptor.md)

## Methods

### buildSortProperties

▸ **buildSortProperties**\<`T`\>(`entityDescriptor`, `overrideSortKeys?`): `undefined` \| [`IEntitySortDescriptor`](../interfaces/IEntitySortDescriptor.md)\<`T`\>[]

Build sort properties from the descriptor and override if necessary.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entityDescriptor` | [`IEntityDescriptor`](../interfaces/IEntityDescriptor.md)\<`T`\> | The entity descriptor to retrieve the default sort keys. |
| `overrideSortKeys?` | \{ `property`: keyof `T` ; `sortDirection`: [`SortDirection`](../enums/SortDirection.md)  }[] | The override sort keys. |

#### Returns

`undefined` \| [`IEntitySortDescriptor`](../interfaces/IEntitySortDescriptor.md)\<`T`\>[]

The finalised sort keys.

___

### getPrimaryKey

▸ **getPrimaryKey**\<`T`\>(`entityDescriptor`): [`IEntityPropertyDescriptor`](../interfaces/IEntityPropertyDescriptor.md)\<`T`\>

Get the primary key from the descriptor.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entityDescriptor` | [`IEntityDescriptor`](../interfaces/IEntityDescriptor.md)\<`T`\> | The entity descriptor to find the primary key from. |

#### Returns

[`IEntityPropertyDescriptor`](../interfaces/IEntityPropertyDescriptor.md)\<`T`\>

The key if only one was found.

**`Throws`**

If no primary key was found, or more than one.

___

### getSortProperties

▸ **getSortProperties**\<`T`\>(`entityDescriptor`): `undefined` \| [`IEntitySortDescriptor`](../interfaces/IEntitySortDescriptor.md)\<`T`\>[]

Get the sort properties from the descriptor.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entityDescriptor` | [`IEntityDescriptor`](../interfaces/IEntityDescriptor.md)\<`T`\> | The entity descriptor to find the primary key from. |

#### Returns

`undefined` \| [`IEntitySortDescriptor`](../interfaces/IEntitySortDescriptor.md)\<`T`\>[]

The sort keys from the descriptor or undefined if there are none.
