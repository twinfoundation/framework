# Interface: IJwtHeader

The fields in a JSON Web Token header.

## Indexable

▪ [key: `string`]: `unknown`

Additional fields in the header.

## Properties

### alg

• **alg**: [`JwtAlgorithms`](../modules.md#jwtalgorithms)

The algorithm used to sign the token.

___

### kid

• `Optional` **kid**: `string`

The key ID.

___

### typ

• `Optional` **typ**: `string`

The type of the token.
