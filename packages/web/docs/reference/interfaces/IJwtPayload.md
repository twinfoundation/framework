# Interface: IJwtPayload

The fields in a JSON Web Token payload.

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### iss?

> `optional` **iss**: `string`

The issuer of the token.

***

### sub?

> `optional` **sub**: `string`

The subject of the token.

***

### aud?

> `optional` **aud**: `string`

The audience of the token.

***

### exp?

> `optional` **exp**: `number`

The expiration time of the token.

***

### nbf?

> `optional` **nbf**: `number`

The not before time of the token.

***

### iat?

> `optional` **iat**: `number`

The issued at time of the token.

***

### jti?

> `optional` **jti**: `string`

The JWT ID.
