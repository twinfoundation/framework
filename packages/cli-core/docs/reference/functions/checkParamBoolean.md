# Function: checkParamBoolean()

> **checkParamBoolean**(`optionName`, `optionValue`, `allowEnvVar`): `boolean`

Check the option to see if it exists and is a boolean.

## Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean`= `true`

Allow the option to be read from an env var.

## Returns

`boolean`

The final option value.

## Throws

An error if the option is invalid.
