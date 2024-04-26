# Class: EntityConditions

Class to perform condition checks.

## Constructors

### constructor

• **new EntityConditions**(): [`EntityConditions`](EntityConditions.md)

#### Returns

[`EntityConditions`](EntityConditions.md)

## Methods

### check

▸ **check**\<`T`\>(`entity`, `condition?`): `boolean`

See if the entity matches the conditions.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | `T` | The entity to test. |
| `condition?` | [`EntityCondition`](../modules.md#entitycondition)\<`T`\> | The conditions to test. |

#### Returns

`boolean`

True if the entity matches.

___

### compare

▸ **compare**\<`T`\>(`entity`, `comparator`): `boolean`

See if the entity matches the conditions.

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
