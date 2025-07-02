# Class: EnvHelper

Environment variable helper.

## Constructors

### Constructor

> **new EnvHelper**(): `EnvHelper`

#### Returns

`EnvHelper`

## Methods

### envToJson()

> `static` **envToJson**\<`T`\>(`envVars`, `prefix?`): `T`

Get the environment variable as an object with camel cased names.

#### Type Parameters

##### T

`T` = \{[`id`: `string`]: `string`; \}

#### Parameters

##### envVars

The environment variables.

##### prefix?

`string`

The prefix of the environment variables, if not provided gets all.

#### Returns

`T`

The object with camel cased names.
