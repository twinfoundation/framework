# Class: CLI

The main entry point for the CLI.

## Extends

- `CLIBase`

## Constructors

### new CLI()

> **new CLI**(): [`CLI`](CLI.md)

#### Returns

[`CLI`](CLI.md)

#### Inherited from

`CLIBase.constructor`

## Methods

### execute()

> **execute**(`options`, `localesDirectory`, `argv`): `Promise`\<`number`\>

Execute the command line processing.

#### Parameters

• **options**: `ICliOptions`

The options for the CLI.

• **localesDirectory**: `string`

The path to load the locales from.

• **argv**: `string`[]

The process arguments.

#### Returns

`Promise`\<`number`\>

The exit code.

#### Inherited from

`CLIBase.execute`

***

### rootAction()

> `protected` **rootAction**(`program`, `opts`): `Promise`\<`void`\>

Root action which can be overridden in derived classes, defaults to showing help.

#### Parameters

• **program**: `Command`

The main program to handling the commands.

• **opts**: `unknown`

The root options.

#### Returns

`Promise`\<`void`\>

#### Inherited from

`CLIBase.rootAction`

***

### run()

> **run**(`argv`, `localesDirectory`?): `Promise`\<`number`\>

Run the app.

#### Parameters

• **argv**: `string`[]

The process arguments.

• **localesDirectory?**: `string`

The directory for the locales, default to relative to the script.

#### Returns

`Promise`\<`number`\>

The exit code.
