# Interface: IComparatorProperty\<T, C\>

Interface defining comparator which works on a child property.

## Type parameters

• **T** = `unknown`

• **C** = `any`

## Properties

### property

> **property**: keyof `T`

The name of the property in the object to check.

***

### condition

> **condition**: [`EntityCondition`](../type-aliases/EntityCondition.md)\<`C`\>

Perform the condition on the child property.
