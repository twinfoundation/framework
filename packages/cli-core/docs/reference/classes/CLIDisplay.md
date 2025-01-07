# Class: CLIDisplay

Display utilities for the CLI.

## Constructors

### new CLIDisplay()

> **new CLIDisplay**(): [`CLIDisplay`](CLIDisplay.md)

#### Returns

[`CLIDisplay`](CLIDisplay.md)

## Properties

### write()

> `static` **write**: (`buffer`) => `void`

The default output method for writing standard messages.

#### Parameters

##### buffer

The message to output.

`string` | `Uint8Array`

#### Returns

`void`

***

### writeError()

> `static` **writeError**: (`buffer`) => `void`

The default output method for writing error messages.

#### Parameters

##### buffer

The message to output.

`string` | `Uint8Array`

#### Returns

`void`

***

### clearLine()

> `static` **clearLine**: () => `void`

The default output method for clearing the current line.

#### Returns

`void`

## Methods

### header()

> `static` **header**(`title`, `version`, `icon`): `void`

Display the header for the CLI.

#### Parameters

##### title

`string`

The title of the CLI.

##### version

`string`

The version of the CLI.

##### icon

`string`

The icon for the CLI.

#### Returns

`void`

***

### error()

> `static` **error**(`error`, `lineBreaks`): `void`

Display an error message.

#### Parameters

##### error

`unknown`

The error to display.

##### lineBreaks

`boolean` = `true`

Whether to add a line break after the error.

#### Returns

`void`

***

### section()

> `static` **section**(`label`): `void`

Display a section.

#### Parameters

##### label

`string`

The label for the section.

#### Returns

`void`

***

### value()

> `static` **value**(`label`, `value`, `indentLevel`): `void`

Display a value with a label.

#### Parameters

##### label

`string`

The label for the value.

##### value

`unknown`

The value to display.

##### indentLevel

`number` = `0`

The level of indentation.

#### Returns

`void`

***

### task()

> `static` **task**(`label`, `task`?): `void`

Display a task with a label.

#### Parameters

##### label

`string`

The label for the value.

##### task?

`string`

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

### json()

> `static` **json**(`obj`): `void`

Display formatted and colorized JSON.

#### Parameters

##### obj

`unknown`

The object to display.

#### Returns

`void`

***

### done()

> `static` **done**(): `void`

Display the processing is done.

#### Returns

`void`

***

### spinnerStart()

> `static` **spinnerStart**(`i18nMessage`, `spinnerCharacters`, `interval`): `void`

Start the spinner.

#### Parameters

##### i18nMessage

`string` = `"cli.progress.pleaseWait"`

The message to display with the spinner.

##### spinnerCharacters

`string`[] = `...`

The characters to use in the spinner.

##### interval

`number` = `100`

The interval for the spinner.

#### Returns

`void`

***

### spinnerStop()

> `static` **spinnerStop**(): `void`

Stop the spinner.

#### Returns

`void`
