# Class: EntitySorter

Class to perform sort operations on entities.

## Constructors

### constructor

• **new EntitySorter**(): [`EntitySorter`](EntitySorter.md)

#### Returns

[`EntitySorter`](EntitySorter.md)

## Methods

### compare

▸ **compare**\<`T`\>(`entity1`, `entity2`, `prop`, `type`, `direction?`): `number`

Compare two properties.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `entity1` | `T` | `undefined` | The first entity. |
| `entity2` | `T` | `undefined` | The second entity. |
| `prop` | keyof `T` | `undefined` | The property to compare. |
| `type` | [`EntityPropertyDescriptorDataType`](../modules.md#entitypropertydescriptordatatype) | `undefined` | The type of the property. |
| `direction` | [`SortDirection`](../enums/SortDirection.md) | `SortDirection.Ascending` | The direction of the sort. |

#### Returns

`number`

The result of the comparison.

___

### sort

▸ **sort**\<`T`\>(`entities`, `sortDescriptors?`): `T`[]

Sort a list of entities using multiple keys and direction.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entities` | `T`[] | The list of entities. |
| `sortDescriptors?` | [`IEntitySortDescriptor`](../interfaces/IEntitySortDescriptor.md)\<`T`\>[] | The sort keys to use. |

#### Returns

`T`[]

The sorted list.
