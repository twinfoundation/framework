# Class: CLIOptions

Utilities for getting standard options.

## Constructors

### new CLIOptions()

> **new CLIOptions**(): [`CLIOptions`](CLIOptions.md)

#### Returns

[`CLIOptions`](CLIOptions.md)

## Methods

### output()

> `static` **output**(`command`, `opts`): `void`

Get the options for output.

#### Parameters

##### command

`Command`

The command to add the options to.

##### opts

The options of what to include.

###### noConsole

`boolean`

Do not output to the console.

###### json

`boolean`

Output to a JSON file.

###### env

`boolean`

Output to an environment file.

###### mergeJson

`boolean`

Merge existing JSON file.

###### mergeEnv

`boolean`

Merge existing environment file.

#### Returns

`void`
