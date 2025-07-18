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

### execute()

> **execute**(`options`, `localesDirectory`, `argv`): `Promise`\<`number`\>

Execute the command line processing.

#### Parameters

##### options

`ICliOptions`

The options for the CLI.

##### localesDirectory

`string`

The path to load the locales from.

##### argv

`string`[]

The process arguments.

#### Returns

`Promise`\<`number`\>

The exit code.

#### Inherited from

`CLIBase.execute`

***

### configureRoot()

> `protected` **configureRoot**(`program`): `void`

Configure any options or actions at the root program level.

#### Parameters

##### program

`Command`

The root program command.

#### Returns

`void`

#### Inherited from

`CLIBase.configureRoot`

***

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
