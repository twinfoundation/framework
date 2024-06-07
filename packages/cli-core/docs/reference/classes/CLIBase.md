# Class: `abstract` CLIBase

The main entry point for the CLI.

## Constructors

### new CLIBase()

> **new CLIBase**(): [`CLIBase`](CLIBase.md)

#### Returns

[`CLIBase`](CLIBase.md)

## Methods

### execute()

> **execute**(`options`, `localesDirectory`, `argv`): `Promise`\<`number`\>

Execute the command line processing.

#### Parameters

• **options**: [`ICliOptions`](../interfaces/ICliOptions.md)

The options for the CLI.

• **localesDirectory**: `string`

The path to load the locales from.

• **argv**: `string`[]

The process arguments.

#### Returns

`Promise`\<`number`\>

The exit code.

***

### configureRoot()

> `protected` **configureRoot**(`program`): `void`

Configure any options or actions at the root program level.

#### Parameters

• **program**: `Command`

The root program command.

#### Returns

`void`

***

### getCommands()

> `protected` **getCommands**(`program`): `Command`[]

Get the commands for the CLI, override in derived class to supply your own.

#### Parameters

• **program**: `Command`

The main program that the commands will be added to.

#### Returns

`Command`[]

The commands for the CLI.
