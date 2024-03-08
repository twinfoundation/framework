# Class: Urn

Class to help with urns.

## Constructors

### constructor

• **new Urn**(`namespaceIdentifier`, `namespaceSpecific`): [`Urn`](Urn.md)

Create a new instance of Urn.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespaceIdentifier` | `string` | The identifier for the namespace. |
| `namespaceSpecific` | `string` | The specific part of the namespace. |

#### Returns

[`Urn`](Urn.md)

## Methods

### namespaceIdentifier

▸ **namespaceIdentifier**(): `string`

Get the namespace identifier.

#### Returns

`string`

The namespace identifier.

___

### namespaceSpecific

▸ **namespaceSpecific**(): `string`

Get the namespace specific.

#### Returns

`string`

The namespace specific.

___

### toString

▸ **toString**(`omitPrefix?`): `string`

Convert the parts in to a full string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `omitPrefix?` | `boolean` | Omit the urn: prefix from the string. |

#### Returns

`string`

The formatted urn.

___

### addPrefix

▸ **addPrefix**(`urn`): `undefined` \| `string`

Add a urn: prefix if there isn't one already.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urn` | `unknown` | The urn string to add a prefix to. |

#### Returns

`undefined` \| `string`

The urn with a prefix.

___

### fromValidString

▸ **fromValidString**(`urn`): [`Urn`](Urn.md)

Construct a urn from a string that has already been validated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urn` | `string` | The urn to parse. |

#### Returns

[`Urn`](Urn.md)

The formatted urn.

___

### generateRandom

▸ **generateRandom**(`namespace`): [`Urn`](Urn.md)

Generate a random identifier with 32 byte id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | The prefix for the urn. |

#### Returns

[`Urn`](Urn.md)

A new Id in URN format.

___

### guard

▸ **guard**(`source`, `property`, `value`): asserts value is string

Parse a string into the urn parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The urn to parse. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

___

### hasNamespace

▸ **hasNamespace**(`urn`, `namespace`): `boolean`

Does the provided urn match the namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urn` | `string` | The urn to check. |
| `namespace` | `string` | The namespace to match. |

#### Returns

`boolean`

True if the namespace matches.

___

### tryParseExact

▸ **tryParseExact**(`urn`): `undefined` \| [`Urn`](Urn.md)

Try and parse a string into the urn parts it must start with urn:.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urn` | `unknown` | The urn to parse. |

#### Returns

`undefined` \| [`Urn`](Urn.md)

The formatted urn or undefined if the value is not a urn.

___

### validate

▸ **validate**(`property`, `value`, `failures`): value is string

Validate a string as a Urn.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | Throw an exception if the urn property is invalid. |
| `value` | `unknown` | The urn to parse. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is string

The formatted urn.
