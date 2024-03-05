# Class: Url

Class to help with urls.

## Constructors

### constructor

• **new Url**(`url`): [`Url`](Url.md)

Create a new instance of Url.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The url string. |

#### Returns

[`Url`](Url.md)

#### Defined in

[packages/core/src/types/url.ts:31](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L31)

## Methods

### parts

▸ **parts**(): [`IUrlParts`](../interfaces/IUrlParts.md)

Get the parts of the url.

#### Returns

[`IUrlParts`](../interfaces/IUrlParts.md)

The parts of the url.

#### Defined in

[packages/core/src/types/url.ts:143](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L143)

___

### toString

▸ **toString**(): `string`

Convert the parts in to a full string.

#### Returns

`string`

The formatted url.

#### Defined in

[packages/core/src/types/url.ts:151](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L151)

___

### fromParts

▸ **fromParts**(`urlParts`): [`Url`](Url.md)

Construct a url from valid parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlParts` | [`IUrlParts`](../interfaces/IUrlParts.md) | The url to create the parts from. |

#### Returns

[`Url`](Url.md)

The formatted url.

#### Defined in

[packages/core/src/types/url.ts:133](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L133)

___

### fromURLToParts

▸ **fromURLToParts**(`url`): [`IUrlParts`](../interfaces/IUrlParts.md)

Construct a url from a URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `URL` | The url to construct from. |

#### Returns

[`IUrlParts`](../interfaces/IUrlParts.md)

The formatted url.

#### Defined in

[packages/core/src/types/url.ts:117](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L117)

___

### guard

▸ **guard**(`source`, `property`, `value`): asserts value is string

Parse a string into the url parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source of the error. |
| `property` | `string` | The name of the property. |
| `value` | `unknown` | The url to parse. |

#### Returns

asserts value is string

**`Throws`**

GuardError If the value does not match the assertion.

#### Defined in

[packages/core/src/types/url.ts:67](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L67)

___

### tryParseExact

▸ **tryParseExact**(`url`): `undefined` \| [`Url`](Url.md)

Try and parse a string into the url parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `unknown` | The url to parse. |

#### Returns

`undefined` \| [`Url`](Url.md)

The formatted url or undefined if the value is not a url.

#### Defined in

[packages/core/src/types/url.ts:47](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L47)

___

### validate

▸ **validate**(`property`, `value`, `failures`): value is Url

Validate a string as a Url.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | Throw an exception if the url property is invalid. |
| `value` | `unknown` | The url to parse. |
| `failures` | [`IValidationFailure`](../interfaces/IValidationFailure.md)[] | The list of failures to add to. |

#### Returns

value is Url

The formatted url.

#### Defined in

[packages/core/src/types/url.ts:84](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/types/url.ts#L84)
