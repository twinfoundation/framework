# Function: checkParamNumber()

> **checkParamNumber**(`optionName`, `optionValue`, `allowEnvVar`, `minValue`?, `maxValue`?): `number`

Check the option to see if it exists and is a number.

## Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean`= `true`

Allow the option to be read from an env var.

• **minValue?**: `number`

The minimum value.

• **maxValue?**: `number`

The maximum value.

## Returns

`number`

The final option value.

## Throws

An error if the option is invalid.
