# Function: actionCommandMnemonic()

> **actionCommandMnemonic**(`opts`): `Promise`\<`void`\>

Action the mnemonic command.

## Parameters

• **opts**

The options for the command.

• **opts.strength**: `string`

The mnemonic strength.

• **opts.seedFormat**: `"hex"` \| `"base64"`

The output format of the seed.

• **opts.console**: `boolean`

Flag to display on the console.

• **opts.json?**: `string`

Output the data to a JSON file.

• **opts.mergeJson**: `boolean`

Merge the data to a JSON file.

• **opts.env?**: `string`

Output the data to an environment file.

• **opts.mergeEnv**: `boolean`

Merge the data to an environment file.

## Returns

`Promise`\<`void`\>
