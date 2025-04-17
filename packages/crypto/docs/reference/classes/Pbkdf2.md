# Class: Pbkdf2

Implementation of the password based key derivation function 2.

## Constructors

### Constructor

> **new Pbkdf2**(): `Pbkdf2`

#### Returns

`Pbkdf2`

## Methods

### sha256()

> `static` **sha256**(`password`, `salt`, `iterations`, `keyLength`): `Uint8Array`

Derive a key from the parameters using Sha256.

#### Parameters

##### password

`Uint8Array`

The password to derive the key from.

##### salt

`Uint8Array`

The salt for the derivation.

##### iterations

`number`

Number of iterations to perform.

##### keyLength

`number`

The length of the key to derive.

#### Returns

`Uint8Array`

The derived key.

***

### sha512()

> `static` **sha512**(`password`, `salt`, `iterations`, `keyLength`): `Uint8Array`

Derive a key from the parameters using Sha512.

#### Parameters

##### password

`Uint8Array`

The password to derive the key from.

##### salt

`Uint8Array`

The salt for the derivation.

##### iterations

`number`

Number of iterations to perform.

##### keyLength

`number`

The length of the key to derive.

#### Returns

`Uint8Array`

The derived key.
