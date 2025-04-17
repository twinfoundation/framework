# Class: ErrorHelper

Error helper functions.

## Constructors

### Constructor

> **new ErrorHelper**(): `ErrorHelper`

#### Returns

`ErrorHelper`

## Methods

### formatErrors()

> `static` **formatErrors**(`error`): `string`[]

Format Errors and returns just their messages.

#### Parameters

##### error

`unknown`

The error to format.

#### Returns

`string`[]

The error formatted including any inner errors.

***

### localizeErrors()

> `static` **localizeErrors**(`error`): [`IError`](../interfaces/IError.md)[]

Localize the content of an error and any inner errors.

#### Parameters

##### error

`unknown`

The error to format.

#### Returns

[`IError`](../interfaces/IError.md)[]

The localized version of the errors flattened.

***

### formatValidationErrors()

> `static` **formatValidationErrors**(`error`): `undefined` \| `string`

Localize the content of an error and any inner errors.

#### Parameters

##### error

[`IError`](../interfaces/IError.md)

The error to format.

#### Returns

`undefined` \| `string`

The localized version of the errors flattened.
