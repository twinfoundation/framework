# Class: CLIParam

Parameter utilities for the CLI.

## Constructors

### new CLIParam()

> **new CLIParam**(): [`CLIParam`](CLIParam.md)

#### Returns

[`CLIParam`](CLIParam.md)

## Methods

### env()

> `static` **env**(`optionName`, `optionValue`, `allowEnvVar`): `undefined` \| `string`

Check the option to see if it exists.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean`

Allow the option to be read from an env var.

#### Returns

`undefined` \| `string`

The final option value.

#### Throws

An error if the option is invalid.

***

### stringValue()

> `static` **stringValue**(`optionName`, `optionValue`, `allowEnvVar`): `string`

Check the option to see if it exists.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`string`

The final option value.

#### Throws

An error if the option is invalid.

***

### url()

> `static` **url**(`optionName`, `optionValue`, `allowEnvVar`): `string`

Check the option to see if it a url.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`string`

The final option value.

#### Throws

An error if the option is invalid.

***

### number()

> `static` **number**(`optionName`, `optionValue`, `allowEnvVar`, `minValue`, `maxValue`?): `number`

Check the option to see if it exists and is a number.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

• **minValue**: `number` = `0`

The minimum value.

• **maxValue?**: `number`

The maximum value.

#### Returns

`number`

The final option value.

#### Throws

An error if the option is invalid.

***

### integer()

> `static` **integer**(`optionName`, `optionValue`, `allowEnvVar`, `minValue`, `maxValue`?): `number`

Check the option to see if it exists and is an integer.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

• **minValue**: `number` = `0`

The minimum value.

• **maxValue?**: `number`

The maximum value.

#### Returns

`number`

The final option value.

#### Throws

An error if the option is invalid.

***

### bigint()

> `static` **bigint**(`optionName`, `optionValue`, `allowEnvVar`, `minValue`, `maxValue`?): `bigint`

Check the option to see if it exists and is a big number.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

• **minValue**: `bigint` = `0n`

The minimum value.

• **maxValue?**: `bigint`

The maximum value.

#### Returns

`bigint`

The final option value.

#### Throws

An error if the option is invalid.

***

### boolean()

> `static` **boolean**(`optionName`, `optionValue`, `allowEnvVar`): `boolean`

Check the option to see if it exists and is a boolean.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`boolean`

The final option value.

#### Throws

An error if the option is invalid.

***

### hex()

> `static` **hex**(`optionName`, `optionValue`, `allowEnvVar`): `Uint8Array`

Check the option to see if it exists and is hex.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`Uint8Array`

The final option value.

#### Throws

An error if the option is invalid.

***

### base64()

> `static` **base64**(`optionName`, `optionValue`, `allowEnvVar`): `Uint8Array`

Check the option to see if it exists and is base64.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`Uint8Array`

The final option value.

#### Throws

An error if the option is invalid.

***

### hexBase64()

> `static` **hexBase64**(`optionName`, `optionValue`, `allowEnvVar`): `Uint8Array`

Check the option to see if it exists and is hex or base64.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`Uint8Array`

The final option value.

#### Throws

An error if the option is invalid.

***

### bech32()

> `static` **bech32**(`optionName`, `optionValue`, `allowEnvVar`): `string`

Check the option to see if it exists and is bech32.

#### Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean` = `true`

Allow the option to be read from an env var.

#### Returns

`string`

The final option value.

#### Throws

An error if the option is invalid.
