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

• **command**: `Command`

The command to add the options to.

• **opts**

The options of what to include.

• **opts.noConsole**: `boolean`

Do not output to the console.

• **opts.json**: `boolean`

Output to a JSON file.

• **opts.env**: `boolean`

Output to an environment file.

• **opts.mergeJson**: `boolean`

Merge existing JSON file.

• **opts.mergeEnv**: `boolean`

Merge existing environment file.

#### Returns

`void`
