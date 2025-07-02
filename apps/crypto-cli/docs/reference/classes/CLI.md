# Class: CLI

The main entry point for the CLI.

## Extends

- `CLIBase`

## Constructors

### Constructor

> **new CLI**(): `CLI`

#### Returns

`CLI`

#### Inherited from

`CLIBase.constructor`

## Methods

### run()

> **run**(`argv`, `localesDirectory?`, `options?`): `Promise`\<`number`\>

Run the app.

#### Parameters

##### argv

`string`[]

The process arguments.

##### localesDirectory?

`string`

The directory for the locales, default to relative to the script.

##### options?

Additional options.

###### overrideOutputWidth?

`number`

Override the output width.

#### Returns

`Promise`\<`number`\>

The exit code.
