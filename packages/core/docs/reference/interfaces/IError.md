# Interface: IError

Model to describe serialized error.

## Properties

### name

> **name**: `string`

The name for the error.

***

### message

> **message**: `string`

The message for the error.

***

### source?

> `optional` **source**: `string`

The source of the error.

***

### properties?

> `optional` **properties**: `object`

Any additional information for the error.

#### Index signature

 \[`id`: `string`\]: `unknown`

***

### stack?

> `optional` **stack**: `string`

The stack trace for the error.

***

### inner?

> `optional` **inner**: [`IError`](IError.md)

The inner error if there was one.
