# Class: Url

Class to help with urls.

## Constructors

### Constructor

> **new Url**(`url`): `Url`

Create a new instance of Url.

#### Parameters

##### url

`string`

The url string.

#### Returns

`Url`

## Methods

### tryParseExact()

> `static` **tryParseExact**(`url`): `undefined` \| `Url`

Try and parse a string into the url parts.

#### Parameters

##### url

`unknown`

The url to parse.

#### Returns

`undefined` \| `Url`

The formatted url or undefined if the value is not a url.

***

### guard()

> `static` **guard**(`source`, `property`, `value`): `asserts value is string`

Parse a string into the url parts.

#### Parameters

##### source

`string`

The source of the error.

##### property

`string`

The name of the property.

##### value

`unknown`

The url to parse.

#### Returns

`asserts value is string`

#### Throws

GuardError If the value does not match the assertion.

***

### validate()

> `static` **validate**(`property`, `value`, `failures`): `value is Url`

Validate a string as a Url.

#### Parameters

##### property

`string`

Throw an exception if the url property is invalid.

##### value

`unknown`

The url to parse.

##### failures

[`IValidationFailure`](../interfaces/IValidationFailure.md)[]

The list of failures to add to.

#### Returns

`value is Url`

The formatted url.

***

### fromURLToParts()

> `static` **fromURLToParts**(`url`): [`IUrlParts`](../interfaces/IUrlParts.md)

Construct a url from a URL.

#### Parameters

##### url

`URL`

The url to construct from.

#### Returns

[`IUrlParts`](../interfaces/IUrlParts.md)

The formatted url.

***

### fromParts()

> `static` **fromParts**(`urlParts`): `Url`

Construct a url from valid parts.

#### Parameters

##### urlParts

[`IUrlParts`](../interfaces/IUrlParts.md)

The url to create the parts from.

#### Returns

`Url`

The formatted url.

***

### parts()

> **parts**(): [`IUrlParts`](../interfaces/IUrlParts.md)

Get the parts of the url.

#### Returns

[`IUrlParts`](../interfaces/IUrlParts.md)

The parts of the url.

***

### toString()

> **toString**(): `string`

Convert the parts in to a full string.

#### Returns

`string`

The formatted url.
