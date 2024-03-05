# Class: ConfigHelper

Class to help with configuration object.

## Constructors

### constructor

• **new ConfigHelper**(): [`ConfigHelper`](ConfigHelper.md)

#### Returns

[`ConfigHelper`](ConfigHelper.md)

## Methods

### stripComments

▸ **stripComments**(`config`): `string`

Strip comments from the config.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `string` | The configuration content. |

#### Returns

`string`

The configuration content with comments stripped.

#### Defined in

[packages/core/src/utils/configHelper.ts:23](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/configHelper.ts#L23)

___

### substituteEnvironment

▸ **substituteEnvironment**\<`T`\>(`config`, `processEnv`): `T`

Expand environment variables.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `string` | The configuration object. |
| `processEnv` | `Object` | - |

#### Returns

`T`

The updated configuration object.

#### Defined in

[packages/core/src/utils/configHelper.ts:34](https://github.com/gtscio/framework/blob/e3dfdc9/packages/core/src/utils/configHelper.ts#L34)
