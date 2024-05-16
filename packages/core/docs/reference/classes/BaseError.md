# Class: BaseError

Class to handle errors.

## Extends

- `Error`

## Extended by

- [`AlreadyExistsError`](AlreadyExistsError.md)
- [`ConflictError`](ConflictError.md)
- [`GeneralError`](GeneralError.md)
- [`GuardError`](GuardError.md)
- [`NotFoundError`](NotFoundError.md)
- [`NotImplementedError`](NotImplementedError.md)
- [`NotSupportedError`](NotSupportedError.md)
- [`UnauthorizedError`](UnauthorizedError.md)
- [`ValidationError`](ValidationError.md)

## Implements

- [`IError`](../interfaces/IError.md)

## Constructors

### new BaseError()

> **new BaseError**(`name`, `source`, `message`, `properties`?, `inner`?): [`BaseError`](BaseError.md)

Create a new instance of BaseError.

#### Parameters

• **name**: `string`

The name of the error.

• **source**: `string`

The source of the error.

• **message**: `string`

The message as a code.

• **properties?**

Any additional information for the error.

• **inner?**: `unknown`

The inner error if we have wrapped another error.

#### Returns

[`BaseError`](BaseError.md)

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

***

### inner?

> `optional` **inner**: [`IError`](../interfaces/IError.md)

The inner error if there was one.

#### Implementation of

[`IError`](../interfaces/IError.md).[`inner`](../interfaces/IError.md#inner)

***

### message

> **message**: `string`

The message for the error.

#### Implementation of

[`IError`](../interfaces/IError.md).[`message`](../interfaces/IError.md#message)

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

The name for the error.

#### Implementation of

[`IError`](../interfaces/IError.md).[`name`](../interfaces/IError.md#name)

#### Inherited from

`Error.name`

***

### properties?

> `optional` **properties**: `object`

Any additional information for the error.

#### Index signature

 \[`id`: `string`\]: `unknown`

#### Implementation of

[`IError`](../interfaces/IError.md).[`properties`](../interfaces/IError.md#properties)

***

### source?

> `optional` **source**: `string`

The source of the error.

#### Implementation of

[`IError`](../interfaces/IError.md).[`source`](../interfaces/IError.md#source)

***

### stack?

> `optional` **stack**: `string`

The stack trace for the error.

#### Implementation of

[`IError`](../interfaces/IError.md).[`stack`](../interfaces/IError.md#stack)

#### Inherited from

`Error.stack`

## Methods

### toJsonObject()

> **toJsonObject**(`includeStack`?): [`IError`](../interfaces/IError.md)

Serialize the error to the error model.

#### Parameters

• **includeStack?**: `boolean`

Include the stack in the error.

#### Returns

[`IError`](../interfaces/IError.md)

The error model.

***

### expand()

> `static` **expand**(`errors`): `undefined` \| [`IError`](../interfaces/IError.md)

Expand an error tree.

#### Parameters

• **errors**: `undefined` \| [`IError`](../interfaces/IError.md)[]

The list of errors to expand.

#### Returns

`undefined` \| [`IError`](../interfaces/IError.md)

The first level error.

***

### flatten()

> `static` **flatten**(`err`): [`IError`](../interfaces/IError.md)[]

Flatten an error tree.

#### Parameters

• **err**: `unknown`

The starting error.

#### Returns

[`IError`](../interfaces/IError.md)[]

The list of all internal errors.

***

### fromError()

> `static` **fromError**(`err`): [`BaseError`](BaseError.md)

Construct an error from an existing one.

#### Parameters

• **err**: `unknown`

The existing error.

#### Returns

[`BaseError`](BaseError.md)

The new instance.

***

### isErrorCode()

> `static` **isErrorCode**(`error`, `code`): `boolean`

Test to see if the error has the specified error code.

#### Parameters

• **error**: `unknown`

The error to test.

• **code**: `string` \| `RegExp`

The code to check for.

#### Returns

`boolean`

True if the error has the code.

***

### isErrorMessage()

> `static` **isErrorMessage**(`error`, `message`): `error is BaseError`

Test to see if the error has the specified error message.

#### Parameters

• **error**: `unknown`

The error to test.

• **message**: `string` \| `RegExp`

The message to check for.

#### Returns

`error is BaseError`

True if the error has the name.

***

### isErrorName()

> `static` **isErrorName**(`error`, `name`): `error is BaseError`

Test to see if the error has the specified error name.

#### Parameters

• **error**: `unknown`

The error to test.

• **name**: `string` \| `RegExp`

The name to check for.

#### Returns

`error is BaseError`

True if the error has the name.

***

### someErrorClass()

> `static` **someErrorClass**(`error`, `cls`): `error is BaseError`

Test to see if any of the errors or children are from a specific class.

#### Parameters

• **error**: `unknown`

The error to test.

• **cls**: `string`

The class to check for.

#### Returns

`error is BaseError`

True if the error has the specific class.

***

### someErrorCode()

> `static` **someErrorCode**(`error`, `code`): `error is BaseError`

Test to see if any of the errors or children have the given error code.

#### Parameters

• **error**: `unknown`

The error to test.

• **code**: `string` \| `RegExp`

The code to check for.

#### Returns

`error is BaseError`

True if the error has the name.

***

### someErrorMessage()

> `static` **someErrorMessage**(`error`, `message`): `error is BaseError`

Test to see if any of the errors or children have the given error message.

#### Parameters

• **error**: `unknown`

The error to test.

• **message**: `string` \| `RegExp`

The message to check for.

#### Returns

`error is BaseError`

True if the error has the name.

***

### someErrorName()

> `static` **someErrorName**(`error`, `name`): `error is BaseError`

Test to see if any of the errors or children have the given error name.

#### Parameters

• **error**: `unknown`

The error to test.

• **name**: `string` \| `RegExp`

The name to check for.

#### Returns

`error is BaseError`

True if the error has the name.
