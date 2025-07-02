# Class: FetchError

Class to represent errors from fetch.

## Extends

- `BaseError`

## Constructors

### Constructor

> **new FetchError**(`source`, `message`, `httpStatus`, `properties?`, `inner?`): `FetchError`

Create a new instance of FetchError.

#### Parameters

##### source

`string`

The source of the error.

##### message

`string`

The message as a code.

##### httpStatus

[`HttpStatusCode`](../type-aliases/HttpStatusCode.md)

The http status code.

##### properties?

Any additional information for the error.

##### inner?

`unknown`

The inner error if we have wrapped another error.

#### Returns

`FetchError`

#### Overrides

`BaseError.constructor`

## Properties

### CLASS\_NAME

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.
