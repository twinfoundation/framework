# Function: checkParamBech32()

> **checkParamBech32**(`optionName`, `optionValue`, `allowEnvVar`): `string`

Check the option to see if it exists and is bech32.

## Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean`= `true`

Allow the option to be read from an env var.

## Returns

`string`

The final option value.

## Throws

An error if the option is invalid.
