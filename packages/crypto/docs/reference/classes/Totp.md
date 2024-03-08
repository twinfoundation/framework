# Class: Totp

Perform TOTP.
Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .

## Constructors

### constructor

• **new Totp**(): [`Totp`](Totp.md)

#### Returns

[`Totp`](Totp.md)

## Methods

### generate

▸ **generate**(`key`, `timeStep?`, `now?`): `string`

Generate a time based One Time Password.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `Uint8Array` | `undefined` | Key for the one time password. |
| `timeStep` | `number` | `30` | The time step of the counter. |
| `now` | `number` | `undefined` | The timestamp now. |

#### Returns

`string`

The one time password.

___

### generateAuthUrl

▸ **generateAuthUrl**(`issuer`, `label`, `secretBase32`): `string`

Generate a url for use with authenticator apps.
See https://github.com/google/google-authenticator/wiki/Key-Uri-Format .

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | The issuer of the totp. |
| `label` | `string` | The label that will show in auth apps. |
| `secretBase32` | `string` | The secret as base 32. |

#### Returns

`string`

The url.

___

### generateSecret

▸ **generateSecret**(`length`): `string`

Generate a secret.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | The length of the secret to generate. |

#### Returns

`string`

The secret encoded as base32.

___

### secretToBytes

▸ **secretToBytes**(`secretBase32`): `Uint8Array`

Convert the secret back to bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretBase32` | `string` | The secret encoded as base32. |

#### Returns

`Uint8Array`

The bytes of the secret.

___

### verify

▸ **verify**(`token`, `key`, `window?`, `timeStep?`, `now?`): `undefined` \| `number`

Check a One Time Password based on a timer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `token` | `string` | `undefined` | Passcode to validate. |
| `key` | `Uint8Array` | `undefined` | Key for the one time password. This should be unique and secret for every user as it is the seed used to calculate the HMAC. |
| `window` | `number` | `2` | The allowable margin for the counter. |
| `timeStep` | `number` | `30` | The time step of the counter. |
| `now` | `number` | `undefined` | The timestamp now. |

#### Returns

`undefined` \| `number`

Undefined if failure, delta on success
delta is the time step difference between the client and the server.
