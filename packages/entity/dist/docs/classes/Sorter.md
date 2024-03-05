# Class: Sorter

Class to perform sort operations.

## Constructors

### constructor

• **new Sorter**(): [`Sorter`](Sorter.md)

#### Returns

[`Sorter`](Sorter.md)

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
| `direction` | ``"desc"`` \| ``"asc"`` | `"asc"` | The direction of the sort. |

#### Returns

`number`

The result of the comparison.
