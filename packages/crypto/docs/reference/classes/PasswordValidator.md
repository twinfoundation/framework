# Class: PasswordValidator

Test password strength.
Ref https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls .

## Constructors

### new PasswordValidator()

> **new PasswordValidator**(): [`PasswordValidator`](PasswordValidator.md)

#### Returns

[`PasswordValidator`](PasswordValidator.md)

## Methods

### validate()

> `static` **validate**(`property`, `password`, `failures`, `options`?): `void`

Test the strength of the password.

#### Parameters

##### property

`string`

The name of the property.

##### password

`string`

The password to test.

##### failures

`IValidationFailure`[]

The list of failures to add to.

##### options?

Options to configure the testing.

###### minLength?

`number`

The minimum length of the password, defaults to 8.

###### maxLength?

`number`

The minimum length of the password, defaults to 128.

###### minPhraseLength?

`number`

The minimum length of the password for it to be considered a pass phrase.

#### Returns

`void`
