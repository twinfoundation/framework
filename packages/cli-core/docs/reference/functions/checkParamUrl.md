# Function: checkParamUrl()

> **checkParamUrl**(`optionName`, `optionValue`, `allowEnvVar`): `string`

Check the option to see if it a url.

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
