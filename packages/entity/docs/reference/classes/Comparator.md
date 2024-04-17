# Class: Comparator

Class to perform comparison operations using comparators.

## Constructors

### constructor

• **new Comparator**(): [`Comparator`](Comparator.md)

#### Returns

[`Comparator`](Comparator.md)

## Methods

### testCondition

▸ **testCondition**\<`T`\>(`entity`, `comparator`): `boolean`

See if the entity matches the comparator.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | `T` | The entity to test. |
| `comparator` | [`IComparator`](../interfaces/IComparator.md)\<`T`\> | The condition to test. |

#### Returns

`boolean`

True if the entity matches.

___

### testConditions

▸ **testConditions**\<`T`\>(`entity`, `comparator?`): `boolean`

See if the entity matches the comparators.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | `T` | The entity to test. |
| `comparator?` | [`IComparator`](../interfaces/IComparator.md)\<`T`\> \| [`IComparatorGroup`](../interfaces/IComparatorGroup.md)\<`T`\> | The conditions to test. |

#### Returns

`boolean`

True if the entity matches.
