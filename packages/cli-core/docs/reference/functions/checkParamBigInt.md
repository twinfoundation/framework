# Function: checkParamBigInt()

> **checkParamBigInt**(`optionName`, `optionValue`, `allowEnvVar`, `minValue`?, `maxValue`?): `bigint`

Check the option to see if it exists and is a big number.

## Parameters

• **optionName**: `string`

The name of the option.

• **optionValue**: `undefined` \| `string`

The option value.

• **allowEnvVar**: `boolean`= `true`

Allow the option to be read from an env var.

• **minValue?**: `bigint`

The minimum value.

• **maxValue?**: `bigint`

The maximum value.

## Returns

`bigint`

The final option value.

## Throws

An error if the option is invalid.
