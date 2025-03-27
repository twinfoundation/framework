# Class: UnauthorizedError

Class to handle errors which are triggered by access not being unauthorized.

## Extends

- [`BaseError`](BaseError.md)

## Constructors

### new UnauthorizedError()

> **new UnauthorizedError**(`source`, `message`, `inner`?): [`UnauthorizedError`](UnauthorizedError.md)

Create a new instance of UnauthorizedError.

#### Parameters

##### source

`string`

The source of the error.

##### message

`string`

The message as a code.

##### inner?

`unknown`

The inner error if we have wrapped another error.

#### Returns

[`UnauthorizedError`](UnauthorizedError.md)

#### Overrides

[`BaseError`](BaseError.md).[`constructor`](BaseError.md#constructors)

## Properties

### source?

> `optional` **source**: `string`

The source of the error.

#### Inherited from

[`BaseError`](BaseError.md).[`source`](BaseError.md#source-1)

***

### properties?

> `optional` **properties**: `object`

Any additional information for the error.

#### Index Signature

\[`id`: `string`\]: `unknown`

#### Inherited from

[`BaseError`](BaseError.md).[`properties`](BaseError.md#properties-1)

***

### inner?

> `optional` **inner**: [`IError`](../interfaces/IError.md)

The inner error if there was one.

#### Inherited from

[`BaseError`](BaseError.md).[`inner`](BaseError.md#inner-1)

***

### CLASS\_NAME

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### fromError()

> `static` **fromError**(`err`): [`BaseError`](BaseError.md)

Construct an error from an existing one.

#### Parameters

##### err

`unknown`

The existing error.

#### Returns

[`BaseError`](BaseError.md)

The new instance.

#### Inherited from

[`BaseError`](BaseError.md).[`fromError`](BaseError.md#fromerror)

***

### flatten()

> `static` **flatten**(`err`): [`IError`](../interfaces/IError.md)[]

Flatten an error tree.

#### Parameters

##### err

`unknown`

The starting error.

#### Returns

[`IError`](../interfaces/IError.md)[]

The list of all internal errors.

#### Inherited from

[`BaseError`](BaseError.md).[`flatten`](BaseError.md#flatten)

***

### expand()

> `static` **expand**(`errors`): `undefined` \| [`IError`](../interfaces/IError.md)

Expand an error tree.

#### Parameters

##### errors

The list of errors to expand.

`undefined` | [`IError`](../interfaces/IError.md)[]

#### Returns

`undefined` \| [`IError`](../interfaces/IError.md)

The first level error.

#### Inherited from

[`BaseError`](BaseError.md).[`expand`](BaseError.md#expand)

***

### isErrorName()

> `static` **isErrorName**(`error`, `name`): `error is BaseError`

Test to see if the error has the specified error name.

#### Parameters

##### error

`unknown`

The error to test.

##### name

The name to check for.

`string` | `RegExp`

#### Returns

`error is BaseError`

True if the error has the name.

#### Inherited from

[`BaseError`](BaseError.md).[`isErrorName`](BaseError.md#iserrorname)

***

### isErrorMessage()

> `static` **isErrorMessage**(`error`, `message`): `error is BaseError`

Test to see if the error has the specified error message.

#### Parameters

##### error

`unknown`

The error to test.

##### message

The message to check for.

`string` | `RegExp`

#### Returns

`error is BaseError`

True if the error has the name.

#### Inherited from

[`BaseError`](BaseError.md).[`isErrorMessage`](BaseError.md#iserrormessage)

***

### isErrorCode()

> `static` **isErrorCode**(`error`, `code`): `boolean`

Test to see if the error has the specified error code.

#### Parameters

##### error

`unknown`

The error to test.

##### code

The code to check for.

`string` | `RegExp`

#### Returns

`boolean`

True if the error has the code.

#### Inherited from

[`BaseError`](BaseError.md).[`isErrorCode`](BaseError.md#iserrorcode)

***

### someErrorName()

> `static` **someErrorName**(`error`, `name`): `error is BaseError`

Test to see if any of the errors or children have the given error name.

#### Parameters

##### error

`unknown`

The error to test.

##### name

The name to check for.

`string` | `RegExp`

#### Returns

`error is BaseError`

True if the error has the name.

#### Inherited from

[`BaseError`](BaseError.md).[`someErrorName`](BaseError.md#someerrorname)

***

### someErrorMessage()

> `static` **someErrorMessage**(`error`, `message`): `error is BaseError`

Test to see if any of the errors or children have the given error message.

#### Parameters

##### error

`unknown`

The error to test.

##### message

The message to check for.

`string` | `RegExp`

#### Returns

`error is BaseError`

True if the error has the name.

#### Inherited from

[`BaseError`](BaseError.md).[`someErrorMessage`](BaseError.md#someerrormessage)

***

### someErrorClass()

> `static` **someErrorClass**(`error`, `cls`): `error is BaseError`

Test to see if any of the errors or children are from a specific class.

#### Parameters

##### error

`unknown`

The error to test.

##### cls

`string`

The class to check for.

#### Returns

`error is BaseError`

True if the error has the specific class.

#### Inherited from

[`BaseError`](BaseError.md).[`someErrorClass`](BaseError.md#someerrorclass)

***

### someErrorCode()

> `static` **someErrorCode**(`error`, `code`): `error is BaseError`

Test to see if any of the errors or children have the given error code.

#### Parameters

##### error

`unknown`

The error to test.

##### code

The code to check for.

`string` | `RegExp`

#### Returns

`error is BaseError`

True if the error has the name.

#### Inherited from

[`BaseError`](BaseError.md).[`someErrorCode`](BaseError.md#someerrorcode)

***

### toJsonObject()

> **toJsonObject**(): [`IError`](../interfaces/IError.md)

Serialize the error to the error model.

#### Returns

[`IError`](../interfaces/IError.md)

The error model.

#### Inherited from

[`BaseError`](BaseError.md).[`toJsonObject`](BaseError.md#tojsonobject)
