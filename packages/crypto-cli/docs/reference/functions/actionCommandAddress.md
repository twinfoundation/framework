# Function: actionCommandAddress()

> **actionCommandAddress**(`opts`): `Promise`\<`void`\>

Action the address command.

## Parameters

• **opts**

The options for the command.

• **opts.seed**: `string`

The seed for generating the addresses.

• **opts.start**: `string`

The start index for the address generation.

• **opts.count**: `string`

The number of addresses to generate.

• **opts.account**: `string`

The account index for the address generation.

• **opts.hrp**: `string`

The human readable part for the address.

• **opts.coin**: `string`

The coin type for the address.

• **opts.keyType**: `"Ed25519"` \| `"Secp256k1"`

The key type for the address.

• **opts.keyFormat**: `"hex"` \| `"base64"`

The output format of the key.

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
