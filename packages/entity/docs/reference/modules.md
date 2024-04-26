# @gtsc/entity

## Enumerations

- [ComparisonOperator](enums/ComparisonOperator.md)
- [LogicalOperator](enums/LogicalOperator.md)
- [SortDirection](enums/SortDirection.md)

## Classes

- [EntityConditions](classes/EntityConditions.md)
- [EntityPropertyDescriptor](classes/EntityPropertyDescriptor.md)
- [EntitySorter](classes/EntitySorter.md)

## Interfaces

- [IComparator](interfaces/IComparator.md)
- [IComparatorGroup](interfaces/IComparatorGroup.md)
- [IEntityDescriptor](interfaces/IEntityDescriptor.md)
- [IEntityPropertyDescriptor](interfaces/IEntityPropertyDescriptor.md)
- [IEntitySortDescriptor](interfaces/IEntitySortDescriptor.md)

## Type Aliases

### EntityCondition

Ƭ **EntityCondition**\<`T`\>: [`IComparator`](interfaces/IComparator.md)\<`T`\> \| [`IComparatorGroup`](interfaces/IComparatorGroup.md)\<`T`\>

Type defining condition for entities filtering.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### EntityPropertyDescriptorDataType

Ƭ **EntityPropertyDescriptorDataType**: ``"string"`` \| ``"integer"`` \| ``"float"`` \| ``"double"`` \| ``"timestamp"`` \| ``"uuid"`` \| ``"binary"`` \| ``"boolean"`` \| ``"object"`` \| ``"list"``

Definition of the entity property data types.
