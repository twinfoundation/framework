# Class: CLI

The main entry point for the CLI.

## Constructors

### new CLI()

> **new CLI**(): [`CLI`](CLI.md)

#### Returns

[`CLI`](CLI.md)

## Methods

### run()

> **run**(`argv`): `Promise`\<`number`\>

Run the app.

#### Parameters

• **argv**: `string`[]

The process arguments.

#### Returns

`Promise`\<`number`\>

The exit code.

***

### execute()

> **execute**(`options`, `argv`): `Promise`\<`number`\>

Execute the command line processing.

#### Parameters

• **options**

The options for the CLI.

• **options.title**: `string`

The title of the CLI.

• **options.appName**: `string`

The name of the app.

• **options.version**: `string`

The version of the app.

• **options.icon**: `string`

The icon for the CLI.

• **argv**: `string`[]

The process arguments.

#### Returns

`Promise`\<`number`\>

The exit code.
