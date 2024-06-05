# Class: CLIDisplay

Display utilities for the CLI.

## Constructors

### new CLIDisplay()

> **new CLIDisplay**(): [`CLIDisplay`](CLIDisplay.md)

#### Returns

[`CLIDisplay`](CLIDisplay.md)

## Properties

### write()

> `static` **write**: (`str`) => `void`

The default output method for writing standard messages.

#### Parameters

• **str**: `string`

The message to output.

#### Returns

`void`

***

### writeError()

> `static` **writeError**: (`str`) => `void`

The default output method for writing error messages.

#### Parameters

• **str**: `string`

The message to output.

#### Returns

`void`

## Methods

### header()

> `static` **header**(`title`, `version`, `icon`): `void`

Display the header for the CLI.

#### Parameters

• **title**: `string`

The title of the CLI.

• **version**: `string`

The version of the CLI.

• **icon**: `string`

The icon for the CLI.

#### Returns

`void`

***

### error()

> `static` **error**(`error`): `void`

Display an error message.

#### Parameters

• **error**: `unknown`

The error to display.

#### Returns

`void`

***

### value()

> `static` **value**(`label`, `value`, `indentLevel`): `void`

Display a value with a label.

#### Parameters

• **label**: `string`

The label for the value.

• **value**: `unknown`

The value to display.

• **indentLevel**: `number`= `0`

The level of indentation.

#### Returns

`void`

***

### task()

> `static` **task**(`label`, `task`?): `void`

Display a task with a label.

#### Parameters

• **label**: `string`

The label for the value.

• **task?**: `string`

The task to display.

#### Returns

`void`

***

### break()

> `static` **break**(): `void`

Display a break.

#### Returns

`void`

***

### done()

> `static` **done**(): `void`

Display the processing is done.

#### Returns

`void`
