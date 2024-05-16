# Class: Hotp

Perform HOTP.
Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .

## Constructors

### new Hotp()

> **new Hotp**(): [`Hotp`](Hotp.md)

#### Returns

[`Hotp`](Hotp.md)

## Methods

### generate()

> `static` **generate**(`key`, `counter`): `string`

Generate a counter based One Time Password.

#### Parameters

• **key**: `Uint8Array`

Key for the one time password.

• **counter**: `number`

This should be stored by the application,
must be user specific, and be incremented for each request.

#### Returns

`string`

The one time password.

***

### verify()

> `static` **verify**(`token`, `key`, `window`, `counter`): `undefined` \| `number`

Check a One Time Password based on a counter.

#### Parameters

• **token**: `string`

Passcode to validate.

• **key**: `Uint8Array`

Key for the one time password.

• **window**: `number`= `50`

The allowable margin for the counter.

• **counter**: `number`= `0`

This should be stored by the application.

#### Returns

`undefined` \| `number`

Undefined if failure, delta on success
delta is the time step difference between the client and the server.
