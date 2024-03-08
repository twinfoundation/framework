# Interface: IError

Model to describe serialized error.

## Implemented by

- [`BaseError`](../classes/BaseError.md)

## Properties

### inner

• `Optional` **inner**: [`IError`](IError.md)

The inner error if there was one.

___

### message

• **message**: `string`

The message for the error.

___

### name

• **name**: `string`

The name for the error.

___

### properties

• `Optional` **properties**: `Object`

Any additional information for the error.

#### Index signature

▪ [id: `string`]: `unknown`

___

### source

• `Optional` **source**: `string`

The source of the error.

___

### stack

• `Optional` **stack**: `string`

The stack trace for the error.
