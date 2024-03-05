# Interface: IComparator

Interface defining comparison operator.

## Properties

### comparison

• **comparison**: [`ComparisonType`](../enums/ComparisonType.md)

The comparison to perform.

#### Defined in

[models/IComparator.ts:23](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IComparator.ts#L23)

___

### logicalOperator

• `Optional` **logicalOperator**: [`LogicalOperator`](../enums/LogicalOperator.md)

The logical operator to use.

#### Defined in

[models/IComparator.ts:28](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IComparator.ts#L28)

___

### property

• **property**: `string`

The name of the property in the object to compare.

#### Defined in

[models/IComparator.ts:13](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IComparator.ts#L13)

___

### value

• **value**: `unknown`

The value of the property to compare.

#### Defined in

[models/IComparator.ts:18](https://github.com/gtscio/framework/blob/e3dfdc9/packages/entity/src/models/IComparator.ts#L18)
