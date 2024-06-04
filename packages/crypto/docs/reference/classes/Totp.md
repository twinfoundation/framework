# Class: Totp

Perform TOTP.
Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .

## Constructors

### new Totp()

> **new Totp**(): [`Totp`](Totp.md)

#### Returns

[`Totp`](Totp.md)

## Methods

### generate()

> `static` **generate**(`key`, `interval`, `timestamp`): `string`

Generate a time based One Time Password.

#### Parameters

• **key**: `Uint8Array`

Key for the one time password.

• **interval**: `number`= `30`

The time step of the counter.

• **timestamp**: `number`= `undefined`

The timestamp.

#### Returns

`string`

The one time password.

***

### verify()

> `static` **verify**(`token`, `key`, `window`, `interval`, `timestamp`): `undefined` \| `number`

Check a One Time Password based on a timer.

#### Parameters

• **token**: `string`

Passcode to validate.

• **key**: `Uint8Array`

Key for the one time password. This should be unique and secret for
every user as it is the seed used to calculate the HMAC.

• **window**: `number`= `2`

The allowable margin for the counter.

• **interval**: `number`= `30`

The time step of the counter.

• **timestamp**: `number`= `undefined`

The timestamp now.

#### Returns

`undefined` \| `number`

Undefined if failure, delta on success

***

### generateSecret()

> `static` **generateSecret**(`length`): `string`

Generate a secret.

#### Parameters

• **length**: `number`

The length of the secret to generate.

#### Returns

`string`

The secret encoded as base32.

***

### secretToBytes()

> `static` **secretToBytes**(`secretBase32`): `Uint8Array`

Convert the secret back to bytes.

#### Parameters

• **secretBase32**: `string`

The secret encoded as base32.

#### Returns

`Uint8Array`

The bytes of the secret.

***

### generateAuthUrl()

> `static` **generateAuthUrl**(`issuer`, `label`, `secretBase32`): `string`

Generate a url for use with authenticator apps.
See https://github.com/google/google-authenticator/wiki/Key-Uri-Format .

#### Parameters

• **issuer**: `string`

The issuer of the totp.

• **label**: `string`

The label that will show in auth apps.

• **secretBase32**: `string`

The secret as base 32.

#### Returns

`string`

The url.
