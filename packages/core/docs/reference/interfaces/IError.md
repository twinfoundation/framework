# Interface: IError

Model to describe serialized error.

## Properties

### inner?

> `optional` **inner**: [`IError`](IError.md)

The inner error if there was one.

***

### message

> **message**: `string`

The message for the error.

***

### name

> **name**: `string`

The name for the error.

***

### properties?

> `optional` **properties**: `object`

Any additional information for the error.

#### Index signature

 \[`id`: `string`\]: `unknown`

***

### source?

> `optional` **source**: `string`

The source of the error.

***

### stack?

> `optional` **stack**: `string`

The stack trace for the error.
