# Function: checkEnvParam()

> **checkEnvParam**(`optionName`, `optionValue`, `allowEnvVar`): `string` \| `undefined`

Check the option to see if it exists.

## Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean`

Allow the option to be read from an env var.

## Returns

`string` \| `undefined`

The final option value.

## Throws

An error if the option is invalid.
