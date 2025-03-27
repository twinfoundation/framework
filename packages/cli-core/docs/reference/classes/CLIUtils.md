# Class: CLIUtils

Utilities function for helping in the CLI.

## Constructors

### new CLIUtils()

> **new CLIUtils**(): [`CLIUtils`](CLIUtils.md)

#### Returns

[`CLIUtils`](CLIUtils.md)

## Methods

### fileExists()

> `static` **fileExists**(`filename`): `Promise`\<`boolean`\>

Does the specified file exist.

#### Parameters

##### filename

`string`

The filename to check for existence.

#### Returns

`Promise`\<`boolean`\>

True if the file exists.

***

### fileExistsSync()

> `static` **fileExistsSync**(`filename`): `boolean`

Does the specified file exist, synchronously.

#### Parameters

##### filename

`string`

The filename to check for existence.

#### Returns

`boolean`

True if the file exists.

***

### dirExists()

> `static` **dirExists**(`dir`): `Promise`\<`boolean`\>

Check if the dir exists.

#### Parameters

##### dir

`string`

The directory to check.

#### Returns

`Promise`\<`boolean`\>

True if the dir exists.

***

### dirExistsSync()

> `static` **dirExistsSync**(`dir`): `boolean`

Check if the dir exists, synchronously.

#### Parameters

##### dir

`string`

The directory to check.

#### Returns

`boolean`

True if the dir exists.

***

### readJsonFile()

> `static` **readJsonFile**\<`T`\>(`filename`): `Promise`\<`undefined` \| `T`\>

Read a JSON file and parse it.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### filename

`string`

The filename to read.

#### Returns

`Promise`\<`undefined` \| `T`\>

The parsed JSON.

***

### readJsonFileSync()

> `static` **readJsonFileSync**\<`T`\>(`filename`): `undefined` \| `T`

Read a JSON file and parse it, synchronously.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### filename

`string`

The filename to read.

#### Returns

`undefined` \| `T`

The parsed JSON.

***

### readLinesFile()

> `static` **readLinesFile**(`filename`): `Promise`\<`undefined` \| `string`[]\>

Read a file as lines.

#### Parameters

##### filename

`string`

The filename to read.

#### Returns

`Promise`\<`undefined` \| `string`[]\>

The lines.

***

### readLinesFileSync()

> `static` **readLinesFileSync**(`filename`): `undefined` \| `string`[]

Read a file as lines, synchronously.

#### Parameters

##### filename

`string`

The filename to read.

#### Returns

`undefined` \| `string`[]

The lines.

***

### findNpmRoot()

> `static` **findNpmRoot**(`rootFolder`): `Promise`\<`string`\>

Find the NPM root based on a package.json path.

#### Parameters

##### rootFolder

`string`

The path to the package.json.

#### Returns

`Promise`\<`string`\>

The root path.

***

### runShellCmd()

> `static` **runShellCmd**(`command`, `args`, `cwd`): `Promise`\<`void`\>

Run a shell command.

#### Parameters

##### command

`string`

The app to run in the shell.

##### args

`string`[]

The args for the app.

##### cwd

`string`

The working directory to execute the command in.

#### Returns

`Promise`\<`void`\>

Promise to wait for command execution to complete.

***

### runShellApp()

> `static` **runShellApp**(`app`, `args`, `cwd`): `Promise`\<`void`\>

Run a shell app.

#### Parameters

##### app

`string`

The app to run in the shell.

##### args

`string`[]

The args for the app.

##### cwd

`string`

The working directory to execute the command in.

#### Returns

`Promise`\<`void`\>

Promise to wait for command execution to complete.

***

### writeJsonFile()

> `static` **writeJsonFile**\<`T`\>(`jsonFilename`, `data`, `append`): `Promise`\<`void`\>

Write a JSON file.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### jsonFilename

The filename to write.

`undefined` | `string`

##### data

`T`

The data to write.

##### append

`boolean`

Append to the file.

#### Returns

`Promise`\<`void`\>

***

### writeEnvFile()

> `static` **writeEnvFile**(`envFilename`, `data`, `append`): `Promise`\<`void`\>

Write an env file.

#### Parameters

##### envFilename

The filename to write.

`undefined` | `string`

##### data

`string`[]

The data to write.

##### append

`boolean`

Append to the file.

#### Returns

`Promise`\<`void`\>
