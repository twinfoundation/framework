# Interface: IError

Model to describe serialized error.

## Implemented by

- [`BaseError`](../classes/BaseError.md)

## Properties

### inner

• `Optional` **inner**: [`IError`](IError.md)

The inner error if there was one.

#### Defined in

[packages/core/src/models/IError.ts:36](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/models/IError.ts#L36)

---

### message

• **message**: `string`

The message for the error.

#### Defined in

[packages/core/src/models/IError.ts:16](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/models/IError.ts#L16)

---

### name

• **name**: `string`

The name for the error.

#### Defined in

[packages/core/src/models/IError.ts:11](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/models/IError.ts#L11)

---

### properties

• `Optional` **properties**: `Object`

Any additional information for the error.

#### Index signature

▪ [id: `string`]: `unknown`

#### Defined in

[packages/core/src/models/IError.ts:26](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/models/IError.ts#L26)

---

### source

• `Optional` **source**: `string`

The source of the error.

#### Defined in

[packages/core/src/models/IError.ts:21](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/models/IError.ts#L21)

---

### stack

• `Optional` **stack**: `string`

The stack trace for the error.

#### Defined in

[packages/core/src/models/IError.ts:31](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/models/IError.ts#L31)
