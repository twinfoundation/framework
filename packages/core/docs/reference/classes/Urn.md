# Class: Urn

Class to help with urns.

## Constructors

### new Urn()

> **new Urn**(`namespaceIdentifier`, `namespaceSpecific`): [`Urn`](Urn.md)

Create a new instance of Urn.

#### Parameters

• **namespaceIdentifier**: `string`

The identifier for the namespace.

• **namespaceSpecific**: `string` \| `string`[]

The specific part of the namespace.

#### Returns

[`Urn`](Urn.md)

## Methods

### generateRandom()

> `static` **generateRandom**(`namespace`): [`Urn`](Urn.md)

Generate a random identifier with 32 byte id.

#### Parameters

• **namespace**: `string`

The prefix for the urn.

#### Returns

[`Urn`](Urn.md)

A new Id in URN format.

***

### hasNamespace()

> `static` **hasNamespace**(`urn`, `namespace`): `boolean`

Does the provided urn match the namespace.

#### Parameters

• **urn**: `string`

The urn to check.

• **namespace**: `string`

The namespace to match.

#### Returns

`boolean`

True if the namespace matches.

***

### tryParseExact()

> `static` **tryParseExact**(`urn`): `undefined` \| [`Urn`](Urn.md)

Try and parse a string into the urn parts.

#### Parameters

• **urn**: `unknown`

The urn to parse.

#### Returns

`undefined` \| [`Urn`](Urn.md)

The formatted urn or undefined if the value is not a urn.

***

### fromValidString()

> `static` **fromValidString**(`urn`): [`Urn`](Urn.md)

Construct a urn from a string that has already been validated.

#### Parameters

• **urn**: `string`

The urn to parse.

#### Returns

[`Urn`](Urn.md)

The formatted urn.

***

### addPrefix()

> `static` **addPrefix**(`urn`): `undefined` \| `string`

Add a urn: prefix if there isn't one already.

#### Parameters

• **urn**: `unknown`

The urn string to add a prefix to.

#### Returns

`undefined` \| `string`

The urn with a prefix.

***

### guard()

> `static` **guard**(`source`, `property`, `value`): `asserts value is string`

Parse a string into the urn parts.

#### Parameters

• **source**: `string`

The source of the error.

• **property**: `string`

The name of the property.

• **value**: `unknown`

The urn to parse.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### validate()

> `static` **validate**(`property`, `value`, `failures`): `value is string`

Validate a string as a Urn.

#### Parameters

• **property**: `string`

Throw an exception if the urn property is invalid.

• **value**: `unknown`

The urn to parse.

• **failures**: [`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is string`

The formatted urn.

***

### parts()

> **parts**(`startIndex`): `string`[]

Get the parts.

#### Parameters

• **startIndex**: `number`= `0`

The index to start from, defaults to 0.

#### Returns

`string`[]

The parts.

***

### namespaceIdentifier()

> **namespaceIdentifier**(): `string`

Get the namespace identifier.

#### Returns

`string`

The namespace identifier.

***

### namespaceMethod()

> **namespaceMethod**(): `string`

Get the namespace method, the first component after the identifier.

#### Returns

`string`

The namespace method.

***

### namespaceSpecificParts()

> **namespaceSpecificParts**(`startIndex`): `string`[]

Get the namespace specific parts.

#### Parameters

• **startIndex**: `number`= `0`

The index to start from, defaults to 0.

#### Returns

`string`[]

The namespace specific parts.

***

### namespaceSpecific()

> **namespaceSpecific**(`startIndex`): `string`

Get the namespace specific.

#### Parameters

• **startIndex**: `number`= `0`

The index to start from, defaults to 0.

#### Returns

`string`

The namespace specific.

***

### toString()

> **toString**(`omitPrefix`): `string`

Convert the parts in to a full string.

#### Parameters

• **omitPrefix**: `boolean`= `true`

Omit the urn: prefix from the string.

#### Returns

`string`

The formatted urn.
