# Class: Hotp

Perform HOTP.
Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .

## Constructors

### Constructor

> **new Hotp**(): `Hotp`

#### Returns

`Hotp`

## Methods

### generate()

> `static` **generate**(`key`, `counter`): `string`

Generate a counter based One Time Password.

#### Parameters

##### key

`Uint8Array`

Key for the one time password.

##### counter

`number`

This should be stored by the application,
must be user specific, and be incremented for each request.

#### Returns

`string`

The one time password.
