# Class: BaseError

Class to handle errors.

## Hierarchy

- `Error`

  ↳ **`BaseError`**

  ↳↳ [`AlreadyExistsError`](AlreadyExistsError.md)

  ↳↳ [`ConflictError`](ConflictError.md)

  ↳↳ [`GeneralError`](GeneralError.md)

  ↳↳ [`GuardError`](GuardError.md)

  ↳↳ [`NotFoundError`](NotFoundError.md)

  ↳↳ [`NotImplementedError`](NotImplementedError.md)

  ↳↳ [`NotSupportedError`](NotSupportedError.md)

  ↳↳ [`UnauthorizedError`](UnauthorizedError.md)

  ↳↳ [`ValidationError`](ValidationError.md)

## Implements

- [`IError`](../interfaces/IError.md)

## Constructors

### constructor

• **new BaseError**(`name`, `source`, `message`, `properties?`, `inner?`): [`BaseError`](BaseError.md)

Create a new instance of BaseError.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the error. |
| `source` | `string` | The source of the error. |
| `message` | `string` | The message as a code. |
| `properties?` | `Object` | Any additional information for the error. |
| `inner?` | `unknown` | The inner error if we have wrapped another error. |

#### Returns

[`BaseError`](BaseError.md)

#### Overrides

Error.constructor

#### Defined in

[packages/core/src/errors/baseError.ts:35](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L35)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### inner

• `Optional` **inner**: [`IError`](../interfaces/IError.md)

The inner error if there was one.

#### Implementation of

[IError](../interfaces/IError.md).[inner](../interfaces/IError.md#inner)

#### Defined in

[packages/core/src/errors/baseError.ts:25](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L25)

___

### message

• **message**: `string`

The message for the error.

#### Implementation of

[IError](../interfaces/IError.md).[message](../interfaces/IError.md#message)

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### name

• **name**: `string`

The name for the error.

#### Implementation of

[IError](../interfaces/IError.md).[name](../interfaces/IError.md#name)

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1075

___

### properties

• `Optional` **properties**: `Object`

Any additional information for the error.

#### Index signature

▪ [id: `string`]: `unknown`

#### Implementation of

[IError](../interfaces/IError.md).[properties](../interfaces/IError.md#properties)

#### Defined in

[packages/core/src/errors/baseError.ts:20](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L20)

___

### source

• `Optional` **source**: `string`

The source of the error.

#### Implementation of

[IError](../interfaces/IError.md).[source](../interfaces/IError.md#source)

#### Defined in

[packages/core/src/errors/baseError.ts:15](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L15)

___

### stack

• `Optional` **stack**: `string`

The stack trace for the error.

#### Implementation of

[IError](../interfaces/IError.md).[stack](../interfaces/IError.md#stack)

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

## Methods

### toJsonObject

▸ **toJsonObject**(`includeStack?`): [`IError`](../interfaces/IError.md)

Serialize the error to the error model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `includeStack?` | `boolean` | Include the stack in the error. |

#### Returns

[`IError`](../interfaces/IError.md)

The error model.

#### Defined in

[packages/core/src/errors/baseError.ts:222](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L222)

___

### expand

▸ **expand**(`errors`): `undefined` \| [`IError`](../interfaces/IError.md)

Expand an error tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errors` | `undefined` \| [`IError`](../interfaces/IError.md)[] | The list of errors to expand. |

#### Returns

`undefined` \| [`IError`](../interfaces/IError.md)

The first level error.

#### Defined in

[packages/core/src/errors/baseError.ts:133](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L133)

___

### flatten

▸ **flatten**(`err`): [`IError`](../interfaces/IError.md)[]

Flatten an error tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `err` | `unknown` | The starting error. |

#### Returns

[`IError`](../interfaces/IError.md)[]

The list of all internal errors.

#### Defined in

[packages/core/src/errors/baseError.ts:113](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L113)

___

### fromError

▸ **fromError**(`err`): [`BaseError`](BaseError.md)

Construct an error from an existing one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `err` | `unknown` | The exising error. |

#### Returns

[`BaseError`](BaseError.md)

The new instance.

#### Defined in

[packages/core/src/errors/baseError.ts:66](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L66)

___

### isErrorCode

▸ **isErrorCode**(`error`, `code`): `boolean`

Test to see if the error has the specified error code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error to test. |
| `code` | `string` \| `RegExp` | The code to check for. |

#### Returns

`boolean`

True if the error has the code.

#### Defined in

[packages/core/src/errors/baseError.ts:180](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L180)

___

### isErrorMessage

▸ **isErrorMessage**(`error`, `message`): error is BaseError

Test to see if the error has the specified error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error to test. |
| `message` | `string` \| `RegExp` | The message to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Defined in

[packages/core/src/errors/baseError.ts:167](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L167)

___

### isErrorName

▸ **isErrorName**(`error`, `name`): error is BaseError

Test to see if the error has the specified error name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error to test. |
| `name` | `string` \| `RegExp` | The name to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Defined in

[packages/core/src/errors/baseError.ts:154](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L154)

___

### someErrorCode

▸ **someErrorCode**(`error`, `code`): error is BaseError

Test to see if any of the errors or children have the given error code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error to test. |
| `code` | `string` \| `RegExp` | The code to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Defined in

[packages/core/src/errors/baseError.ts:213](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L213)

___

### someErrorMessage

▸ **someErrorMessage**(`error`, `message`): error is BaseError

Test to see if any of the errors or children have the given error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error to test. |
| `message` | `string` \| `RegExp` | The message to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Defined in

[packages/core/src/errors/baseError.ts:203](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L203)

___

### someErrorName

▸ **someErrorName**(`error`, `name`): error is BaseError

Test to see if any of the errors or children have the given error name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error to test. |
| `name` | `string` \| `RegExp` | The name to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Defined in

[packages/core/src/errors/baseError.ts:193](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/errors/baseError.ts#L193)
