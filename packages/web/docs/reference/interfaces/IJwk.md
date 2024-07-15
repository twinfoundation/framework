# Interface: IJwk

The fields in a JSON Web Key.

## Indexable

 \[`key`: `string`\]: `unknown`

## Properties

### alg?

> `optional` **alg**: [`JwtAlgorithms`](../type-aliases/JwtAlgorithms.md)

The cryptographic algorithm for the key.

***

### use?

> `optional` **use**: `string`

The intended use for the key.

***

### key\_ops?

> `optional` **key\_ops**: `string`[]

The operation(s) that the key is intended to be used for.

***

### kty

> **kty**: `string`

The key type parameter.

***

### n?

> `optional` **n**: `string`

The public key parameters.

***

### e?

> `optional` **e**: `string`

Exponent parameter.

***

### d?

> `optional` **d**: `string`

The private key parameters.

***

### p?

> `optional` **p**: `string`

The private key parameters.

***

### q?

> `optional` **q**: `string`

The private key parameters.

***

### dp?

> `optional` **dp**: `string`

The private key parameters.

***

### dq?

> `optional` **dq**: `string`

The private key parameters.

***

### qi?

> `optional` **qi**: `string`

The private key parameters.

***

### kid?

> `optional` **kid**: `string`

The key ID.
