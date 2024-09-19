# Class: FetchError

Class to represent errors from fetch.

## Extends

- `BaseError`

## Constructors

### new FetchError()

> **new FetchError**(`source`, `message`, `httpStatus`, `properties`?, `inner`?): [`FetchError`](FetchError.md)

Create a new instance of FetchError.

#### Parameters

• **source**: `string`

The source of the error.

• **message**: `string`

The message as a code.

• **httpStatus**: [`HttpStatusCode`](../type-aliases/HttpStatusCode.md)

The http status code.

• **properties?**

Any additional information for the error.

• **inner?**: `unknown`

The inner error if we have wrapped another error.

#### Returns

[`FetchError`](FetchError.md)

#### Overrides

`BaseError.constructor`

## Properties

### source?

> `optional` **source**: `string`

The source of the error.

#### Inherited from

`BaseError.source`

***

### properties?

> `optional` **properties**: `object`

Any additional information for the error.

#### Index Signature

 \[`id`: `string`\]: `unknown`

#### Inherited from

`BaseError.properties`

***

### inner?

> `optional` **inner**: `IError`

The inner error if there was one.

#### Inherited from

`BaseError.inner`

***

### CLASS\_NAME

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### fromError()

> `static` **fromError**(`err`): `BaseError`

Construct an error from an existing one.

#### Parameters

• **err**: `unknown`

The existing error.

#### Returns

`BaseError`

The new instance.

#### Inherited from

`BaseError.fromError`

***

### flatten()

> `static` **flatten**(`err`): `IError`[]

Flatten an error tree.

#### Parameters

• **err**: `unknown`

The starting error.

#### Returns

`IError`[]

The list of all internal errors.

#### Inherited from

`BaseError.flatten`

***

### expand()

> `static` **expand**(`errors`): `undefined` \| `IError`

Expand an error tree.

#### Parameters

• **errors**: `undefined` \| `IError`[]

The list of errors to expand.

#### Returns

`undefined` \| `IError`

The first level error.

#### Inherited from

`BaseError.expand`

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

#### Inherited from

`BaseError.isErrorName`

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

#### Inherited from

`BaseError.isErrorMessage`

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

#### Inherited from

`BaseError.isErrorCode`

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

#### Inherited from

`BaseError.someErrorName`

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

#### Inherited from

`BaseError.someErrorMessage`

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

#### Inherited from

`BaseError.someErrorClass`

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

#### Inherited from

`BaseError.someErrorCode`

***

### toJsonObject()

> **toJsonObject**(): `IError`

Serialize the error to the error model.

#### Returns

`IError`

The error model.

#### Inherited from

`BaseError.toJsonObject`
