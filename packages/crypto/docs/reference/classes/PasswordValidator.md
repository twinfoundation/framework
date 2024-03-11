# Class: PasswordValidator

Test password strength.
Ref https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls .

## Constructors

### constructor

• **new PasswordValidator**(): [`PasswordValidator`](PasswordValidator.md)

#### Returns

[`PasswordValidator`](PasswordValidator.md)

## Methods

### validate

▸ **validate**(`property`, `password`, `failures`, `options?`): `void`

Test the strength of the password.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `string` | The name of the property. |
| `password` | `string` | The password to test. |
| `failures` | `IValidationFailure`[] | The list of failures to add to. |
| `options?` | `Object` | Options to configure the testing. |
| `options.maxLength?` | `number` | The minimum length of the password, defaults to 128. |
| `options.minLength?` | `number` | The minimum length of the password, defaults to 8. |
| `options.minPhraseLength?` | `number` | The minimum length of the password for it to be considered a pass phrase. |

#### Returns

`void`
